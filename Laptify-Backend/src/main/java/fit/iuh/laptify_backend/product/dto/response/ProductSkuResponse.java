package fit.iuh.laptify_backend.product.dto.response;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductSkuResponse {
    private Long id;
    private String skuCode;
    private String color;
    private BigDecimal price;
    private Integer stockQuantity;
    private String imageUrl;
}
