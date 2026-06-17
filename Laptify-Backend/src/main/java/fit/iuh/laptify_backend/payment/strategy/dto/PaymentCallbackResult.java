package fit.iuh.laptify_backend.payment.strategy.dto;

import java.math.BigDecimal;

/**
 * Normalized outcome parsed from a gateway callback/IPN. Strategies are responsible
 * for verifying the gateway signature before returning {@code success = true}.
 *
 * @param transactionRef        the txn ref used to look the payment up on our side
 * @param success               whether the gateway confirmed a successful charge
 * @param gatewayTransactionId  the gateway's own transaction id (for reconciliation)
 * @param amount                amount reported by the gateway, in VND (may be null)
 * @param message               raw status message from the gateway
 */
public record PaymentCallbackResult(
        String transactionRef,
        boolean success,
        String gatewayTransactionId,
        BigDecimal amount,
        String message
) {
}