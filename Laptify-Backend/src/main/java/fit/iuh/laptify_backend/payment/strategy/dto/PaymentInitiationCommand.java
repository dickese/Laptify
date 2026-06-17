package fit.iuh.laptify_backend.payment.strategy.dto;

import java.math.BigDecimal;

/**
 * Everything a {@code PaymentStrategy} needs to build a gateway payment request.
 * Built by the service layer once per payment attempt.
 *
 * @param orderId        the order being paid
 * @param transactionRef our canonical reference; strategies use it as the gateway txn ref
 * @param amount         total amount due, in VND
 * @param orderInfo      human-readable description shown on the gateway
 * @param clientIp       originating client IP (required by VNPay)
 */
public record PaymentInitiationCommand(
        Long orderId,
        String transactionRef,
        BigDecimal amount,
        String orderInfo,
        String clientIp
) {
}