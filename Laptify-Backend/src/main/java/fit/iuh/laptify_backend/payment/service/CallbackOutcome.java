package fit.iuh.laptify_backend.payment.service;

/**
 * Granular result of applying a gateway IPN, so controllers can map to each gateway's expected
 * acknowledgement format (e.g. VNPay's RspCode 00/01/02/04/97).
 */
public enum CallbackOutcome {
    CONFIRMED,          // signature ok, payment marked SUCCESS, order advanced
    ALREADY_CONFIRMED,  // duplicate IPN for an already-successful payment (idempotent no-op)
    PAYMENT_FAILED,     // signature ok but the gateway reported a failed/declined charge
    INVALID_SIGNATURE,  // signature/checksum verification failed
    ORDER_NOT_FOUND,    // no payment matches the transaction ref
    AMOUNT_MISMATCH     // amount reported by the gateway differs from the recorded amount
}