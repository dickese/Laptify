package fit.iuh.laptify_backend.wishlist.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WishlistRequest {
    private Long userId;
    private Long productId;
}
