package fit.iuh.laptify_backend.product.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductDetailResponse {
    private String id;
    private String name;
    private String categoryId;
    private String brandId;
    private BigDecimal price;
    private Integer totalPurchases;
    private List<ProductSkuResponse> skus;
}
