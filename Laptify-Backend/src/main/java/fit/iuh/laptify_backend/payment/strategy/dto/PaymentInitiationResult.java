package fit.iuh.laptify_backend.payment.strategy.dto;

/**
 * Result of initiating a payment with a gateway.
 *
 * @param paymentUrl     URL to redirect the customer to in order to pay
 * @param transactionRef the reference actually registered with the gateway. Usually echoes
 *                       the command's ref, but some gateways (ZaloPay) require a derived
 *                       value, so the service persists whatever is returned here.
 */
public record PaymentInitiationResult(
        String paymentUrl,
        String transactionRef
) {
}