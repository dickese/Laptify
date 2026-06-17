package fit.iuh.laptify_backend.payment.entity;

/**
 * Supported online payment gateways. Each value is backed by exactly one
 * {@code PaymentStrategy} implementation, keyed through the strategy registry.
 */
public enum PaymentMethod {
    VNPAY, MOMO, ZALOPAY
}