package fit.iuh.laptify_backend.payment.strategy.dto;

import java.math.BigDecimal;

/**
 * Normalized outcome parsed from a gateway callback/IPN. Strategies are responsible
 * for verifying the gateway signature before returning {@code success = true}.
 *
 * @param transactionRef        the txn ref used to look the payment up on our side
 * @param signatureValid        whether the gateway signature/checksum verified. Reported
 *                              separately from {@code success} so the IPN handler can return a
 *                              distinct "invalid checksum" ack (e.g. VNPay code 97).
 * @param success               whether the gateway confirmed a successful charge
 * @param gatewayTransactionId  the gateway's own transaction id (for reconciliation)
 * @param amount                amount reported by the gateway, in VND (may be null)
 * @param message               raw status message from the gateway
 */
public record PaymentCallbackResult(
        String transactionRef,
        boolean signatureValid,
        boolean success,
        String gatewayTransactionId,
        BigDecimal amount,
        String message
) {
}