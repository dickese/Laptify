package fit.iuh.laptify_backend.payment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** FK to {@code orders.id} (orders use manually-assigned Long ids, so this is a plain column). */
    @Column(nullable = false)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod method;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @Column(nullable = false)
    private BigDecimal amount;

    /**
     * Our canonical reference for this attempt, also sent to the gateway as its
     * transaction reference (vnp_TxnRef / orderId / app_trans_id). Used to look the
     * payment back up when the gateway calls our callback. Unique per attempt.
     */
    @Column(nullable = false, unique = true)
    private String transactionRef;

    /** Transaction id assigned by the gateway, captured on a successful callback. */
    private String gatewayTransactionId;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    private Instant paidAt;

    /**
     * True khi cổng xác nhận thành công NHƯNG thời điểm thanh toán đã quá hạn đơn (đơn đã EXPIRED):
     * tiền đã thu nhưng đơn không còn hiệu lực → cần hoàn tiền cho khách. Đánh dấu để ops/ job xử lý.
     */
    @Column(nullable = false)
    private boolean refundRequired;

    public Payment(Long orderId, PaymentMethod method, BigDecimal amount, String transactionRef) {
        this.orderId = orderId;
        this.method = method;
        this.amount = amount;
        this.transactionRef = transactionRef;
        this.status = PaymentStatus.PENDING;
    }
}