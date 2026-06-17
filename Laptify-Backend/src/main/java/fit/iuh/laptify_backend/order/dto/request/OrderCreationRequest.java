package fit.iuh.laptify_backend.order.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreationRequest {
    private CustomerInfo customer;
    private List<ProductInfo> products;
    /** Phương thức thanh toán: COD | VNPAY | MOMO | ZALOPAY. Mặc định COD nếu bỏ trống. */
    private String paymentMethod;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CustomerInfo{
        private String name;
        private String address;
        private String phoneNumber;
        private String email;
        private boolean isSaved;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductInfo{
        private Long productId;
        private String skuCode;
        private int quantity;
    }
}
