package fit.iuh.laptify_backend.payment.entity;

public enum PaymentStatus {
    PENDING,    // payment created, waiting for the customer to complete it on the gateway
    SUCCESS,    // gateway confirmed a successful charge
    FAILED,     // gateway reported a failed/declined charge
    CANCELLED   // customer aborted the payment
}