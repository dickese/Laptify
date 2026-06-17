package fit.iuh.laptify_backend.payment.service.impl;

import fit.iuh.laptify_backend.advice.exception.BadRequestException;
import fit.iuh.laptify_backend.advice.exception.BusinessException;
import fit.iuh.laptify_backend.order.entity.Order;
import fit.iuh.laptify_backend.order.entity.OrderStatus;
import fit.iuh.laptify_backend.order.repository.OrderRepository;
import fit.iuh.laptify_backend.payment.dto.request.PaymentInitiationRequest;
import fit.iuh.laptify_backend.payment.dto.response.PaymentInitiationResponse;
import fit.iuh.laptify_backend.payment.entity.Payment;
import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.entity.PaymentStatus;
import fit.iuh.laptify_backend.payment.registry.PaymentStrategyRegistry;
import fit.iuh.laptify_backend.payment.repository.PaymentRepository;
import fit.iuh.laptify_backend.payment.service.PaymentService;
import fit.iuh.laptify_backend.payment.strategy.PaymentStrategy;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentCallbackResult;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationCommand;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationResult;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final PaymentStrategyRegistry strategyRegistry;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public PaymentInitiationResponse initiatePayment(PaymentInitiationRequest request, String clientIp) {
        PaymentMethod method = parseMethod(request.getMethod());

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found: " + request.getOrderId()));

        if (paymentRepository.existsByOrderIdAndStatus(order.getId(), PaymentStatus.SUCCESS)) {
            throw new BusinessException("Đơn hàng đã được thanh toán");
        }

        BigDecimal amount = order.getTotalDue();
        if (amount == null || amount.signum() <= 0) {
            throw new BadRequestException("Invalid order amount");
        }

        String transactionRef = generateTransactionRef();
        Payment payment = paymentRepository.save(new Payment(order.getId(), method, amount, transactionRef));

        PaymentStrategy strategy = strategyRegistry.resolve(method);
        PaymentInitiationResult result = strategy.initiate(new PaymentInitiationCommand(
                order.getId(),
                transactionRef,
                amount,
                "Thanh toan don hang " + order.getId(),
                clientIp
        ));

        // A strategy may register a derived ref with the gateway (e.g. ZaloPay's app_trans_id);
        // persist whatever it actually used so the callback maps back to this payment.
        payment.setTransactionRef(result.transactionRef());
        paymentRepository.save(payment);

        return new PaymentInitiationResponse(method.name(), result.transactionRef(), result.paymentUrl());
    }

    @Override
    @Transactional
    public PaymentCallbackResult handleCallback(PaymentMethod method, Map<String, String> params) {
        PaymentStrategy strategy = strategyRegistry.resolve(method);
        PaymentCallbackResult result = strategy.parseCallback(params);

        if (result.transactionRef() == null) {
            log.warn("{} callback without a resolvable transaction ref", method);
            return result;
        }

        Payment payment = paymentRepository.findByTransactionRef(result.transactionRef())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Payment not found for ref: " + result.transactionRef()));

        // Idempotency: ignore repeated callbacks once a payment has reached a terminal state.
        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            log.info("Ignoring duplicate callback for already-successful payment {}", payment.getTransactionRef());
            return result;
        }

        if (result.success()) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setGatewayTransactionId(result.gatewayTransactionId());
            payment.setPaidAt(Instant.now());
            advanceOrderAfterPayment(payment.getOrderId());
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }
        paymentRepository.save(payment);

        return result;
    }

    private void advanceOrderAfterPayment(Long orderId) {
        orderRepository.findById(orderId).ifPresent(order -> {
            if (order.getStatus() == OrderStatus.PENDING) {
                order.setStatus(OrderStatus.PACKAGING);
                orderRepository.save(order);
            }
        });
    }

    private PaymentMethod parseMethod(String method) {
        if (method == null || method.isBlank()) {
            throw new BadRequestException("Payment method is required");
        }
        try {
            return PaymentMethod.valueOf(method.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Unsupported payment method: " + method);
        }
    }

    /** Short, unique, gateway-safe reference (alphanumeric, no separators). */
    private String generateTransactionRef() {
        return Long.toString(System.currentTimeMillis())
                + UUID.randomUUID().toString().replace("-", "").substring(0, 6);
    }
}
