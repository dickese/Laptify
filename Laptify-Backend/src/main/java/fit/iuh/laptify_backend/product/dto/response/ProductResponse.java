package fit.iuh.laptify_backend.product.dto.response;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductResponse {
    private String id;
    private String name;
    private BigDecimal price;
    private Integer totalPurchases;
    private String imageUrl;
}
