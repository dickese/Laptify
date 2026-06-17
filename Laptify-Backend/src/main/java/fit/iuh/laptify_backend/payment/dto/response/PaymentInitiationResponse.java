package fit.iuh.laptify_backend.payment.dto.response;

/**
 * Returned to the frontend after initiating a payment. The client redirects the browser to
 * {@code paymentUrl}; {@code transactionRef} lets the client poll/track the payment.
 */
public record PaymentInitiationResponse(
        String method,
        String transactionRef,
        String paymentUrl
) {
}