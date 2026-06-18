package fit.iuh.laptify_backend.order.scheduler;

import fit.iuh.laptify_backend.order.entity.Order;
import fit.iuh.laptify_backend.order.entity.OrderDetail;
import fit.iuh.laptify_backend.order.entity.OrderStatus;
import fit.iuh.laptify_backend.order.repository.OrderRepository;
import fit.iuh.laptify_backend.payment.entity.Payment;
import fit.iuh.laptify_backend.payment.entity.PaymentStatus;
import fit.iuh.laptify_backend.payment.repository.PaymentRepository;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.SkuRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * Đánh dấu EXPIRED cho các đơn PENDING_PAYMENT không thanh toán thành công trong hạn
 * (mặc định 15 phút), tránh tồn tại đơn treo. Đồng thời hoàn lại tồn kho đã trừ lúc
 * tạo đơn và hủy các giao dịch thanh toán còn dang dở của đơn đó.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class OrderExpirationScheduler {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final SkuRepository skuRepository;

    @Value("${payment.order.expiration-minutes:15}")
    private long expirationMinutes;

    /** Quét mỗi phút; chỉ chạm vào đơn đã quá hạn. */
    @Scheduled(fixedDelayString = "${payment.order.expiration-scan-ms:60000}")
    @Transactional
    public void expireStalePendingPayments() {
        Instant cutoff = Instant.now().minus(expirationMinutes, ChronoUnit.MINUTES);
        List<Order> candidates =
                orderRepository.findByStatusAndOrderDateBefore(OrderStatus.PENDING_PAYMENT, cutoff);

        if (candidates.isEmpty()) {
            return;
        }

        int expired = 0;
        for (Order candidate : candidates) {
            // Khóa ghi rồi kiểm tra lại (cùng thứ tự khóa ORDER-trước như IPN, tránh deadlock):
            // một IPN có thể vừa xác nhận đơn này (PENDING_PAYMENT -> PACKAGING) trong lúc chờ khóa;
            // nếu vậy thì bỏ qua, không EXPIRE đơn đã thanh toán.
            Order order = orderRepository.findByIdForUpdate(candidate.getId()).orElse(null);
            if (order == null
                    || order.getStatus() != OrderStatus.PENDING_PAYMENT
                    || !order.getOrderDate().isBefore(cutoff)) {
                continue;
            }
            order.setStatus(OrderStatus.EXPIRED);
            restoreStock(order);
            cancelOpenPayments(order.getId());
            orderRepository.save(order);
            expired++;
        }

        if (expired > 0) {
            log.info("Expired {} PENDING_PAYMENT order(s) past the {}-minute window",
                    expired, expirationMinutes);
        }
    }

    /** Cộng lại số lượng tồn kho và lùi totalPurchases đã trừ khi tạo đơn. */
    private void restoreStock(Order order) {
        if (order.getOrderDetails() == null) {
            return;
        }
        for (OrderDetail detail : order.getOrderDetails()) {
            Sku sku = detail.getSku();
            if (sku == null) {
                continue;
            }
            int stock = sku.getStockQuantity() == null ? 0 : sku.getStockQuantity();
            sku.setStockQuantity(stock + detail.getQuantity());

            int purchases = sku.getTotalPurchases() == null ? 0 : sku.getTotalPurchases();
            sku.setTotalPurchases(Math.max(0, purchases - 1));

            skuRepository.save(sku);
        }
    }

    /** Đóng các lần thử thanh toán còn PENDING của đơn đã hết hạn. */
    private void cancelOpenPayments(Long orderId) {
        List<Payment> open = paymentRepository.findByOrderIdAndStatus(orderId, PaymentStatus.PENDING);
        for (Payment payment : open) {
            payment.setStatus(PaymentStatus.CANCELLED);
        }
        if (!open.isEmpty()) {
            paymentRepository.saveAll(open);
        }
    }
}
