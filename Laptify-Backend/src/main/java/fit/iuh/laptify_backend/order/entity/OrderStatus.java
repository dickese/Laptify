package fit.iuh.laptify_backend.order.entity;

public enum OrderStatus {
    /** Đơn COD vừa tạo, chờ nhân viên xác nhận trước khi đóng gói. */
    PENDING_CONFIRMATION,
    /** Đơn thanh toán trực tuyến vừa tạo, chờ khách hoàn tất thanh toán trên cổng. */
    PENDING_PAYMENT,
    /** Đơn PENDING_PAYMENT quá hạn 15 phút mà chưa thanh toán thành công. */
    EXPIRED,
    /** Trạng thái cũ — giữ lại cho dữ liệu đã tồn tại trước khi tách COD/online. */
    PENDING,
    PACKAGING, SHIPPING, RECEIVED, RETURNED;
}