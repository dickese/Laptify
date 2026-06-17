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
import fit.iuh.laptify_backend.payment.service.CallbackOutcome;
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

        // Chỉ cho phép (thanh toán lần đầu hoặc retry) khi đơn đang chờ thanh toán.
        // Đơn COD, đã đóng gói, hoặc đã hết hạn không được khởi tạo giao dịch online.
        if (order.getStatus() == OrderStatus.EXPIRED) {
            throw new BusinessException("Đơn hàng đã hết hạn thanh toán");
        }
        if (order.getStatus() != OrderStatus.PENDING_PAYMENT
                && order.getStatus() != OrderStatus.PENDING) {
            throw new BusinessException("Đơn hàng không ở trạng thái chờ thanh toán");
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
    public CallbackOutcome processIpn(PaymentMethod method, Map<String, String> params) {
        PaymentStrategy strategy = strategyRegistry.resolve(method);
        PaymentCallbackResult result = strategy.parseCallback(params);

        if (!result.signatureValid()) {
            log.warn("{} IPN rejected: invalid signature (ref={})", method, result.transactionRef());
            return CallbackOutcome.INVALID_SIGNATURE;
        }

        if (result.transactionRef() == null) {
            log.warn("{} IPN without a resolvable transaction ref", method);
            return CallbackOutcome.ORDER_NOT_FOUND;
        }

        Payment payment = paymentRepository.findByTransactionRef(result.transactionRef()).orElse(null);
        if (payment == null) {
            log.warn("{} IPN for unknown payment ref={}", method, result.transactionRef());
            return CallbackOutcome.ORDER_NOT_FOUND;
        }

        // Idempotency: a repeated IPN for an already-confirmed payment is a no-op.
        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            log.info("Duplicate IPN for already-successful payment {}", payment.getTransactionRef());
            return CallbackOutcome.ALREADY_CONFIRMED;
        }

        // Guard against tampered/mismatched amounts (BigDecimal.compareTo ignores scale).
        if (result.amount() != null && payment.getAmount().compareTo(result.amount()) != 0) {
            log.warn("{} IPN amount mismatch for ref={}: expected={} got={}",
                    method, result.transactionRef(), payment.getAmount(), result.amount());
            return CallbackOutcome.AMOUNT_MISMATCH;
        }

        if (result.success()) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setGatewayTransactionId(result.gatewayTransactionId());
            payment.setPaidAt(Instant.now());
            paymentRepository.save(payment);
            advanceOrderAfterPayment(payment.getOrderId());
            return CallbackOutcome.CONFIRMED;
        }

        payment.setStatus(PaymentStatus.FAILED);
        paymentRepository.save(payment);
        return CallbackOutcome.PAYMENT_FAILED;
    }

    @Override
    public PaymentCallbackResult verifyCallback(PaymentMethod method, Map<String, String> params) {
        // Read-only: verify the signature and report the outcome; never mutates state.
        return strategyRegistry.resolve(method).parseCallback(params);
    }

    private void advanceOrderAfterPayment(Long orderId) {
        orderRepository.findById(orderId).ifPresent(order -> {
            order.setPaid(true);
            // Chỉ đẩy sang PACKAGING từ trạng thái chờ thanh toán; không ghi đè đơn đã xử lý.
            if (order.getStatus() == OrderStatus.PENDING_PAYMENT
                    || order.getStatus() == OrderStatus.PENDING) {
                order.setStatus(OrderStatus.PACKAGING);
            }
            orderRepository.save(order);
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
        return System.currentTimeMillis()
                + UUID.randomUUID().toString().replace("-", "").substring(0, 6);
    }
}
