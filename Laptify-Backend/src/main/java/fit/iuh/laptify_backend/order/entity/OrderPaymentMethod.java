package fit.iuh.laptify_backend.order.entity;

/**
 * Phương thức thanh toán mà khách chọn lúc Place Order.
 * COD giao hàng thu tiền; các giá trị còn lại là cổng thanh toán trực tuyến
 * và tương ứng 1-1 với {@code payment.entity.PaymentMethod}.
 */
public enum OrderPaymentMethod {
    COD, VNPAY, MOMO, ZALOPAY;

    /** True nếu đây là thanh toán trực tuyến (không phải COD). */
    public boolean isOnline() {
        return this != COD;
    }
}