package fit.iuh.laptify_backend.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Instant orderDate;
    private BigDecimal totalPrice;
    private BigDecimal shippingFee;
    private BigDecimal totalDue;
    private String status;
    private String paymentMethod;
    private boolean paid;
    private String trackingCode;
    private CustomerInfo customer;
    private List<OrderDetailInfo> orderDetails;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CustomerInfo{
        private String customerName;
        private String email;
        private String phoneNumber;
        private String address;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDetailInfo{
        private Long id;
        private String productName;
        private String color;
        private int quantity;
        private BigDecimal price;
        private BigDecimal subTotal;
        private String imageUrl;
    }
}
