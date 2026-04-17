package fit.iuh.laptify_backend.wishlist.dto;

import fit.iuh.laptify_backend.product.dto.response.ProductResponse;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ProductInWishlistResponse {
    private ProductResponse product;
    private LocalDateTime addedAt;
}
