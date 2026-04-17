package fit.iuh.laptify_backend.wishlist.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserWishlistResponse {
    List<Long> productIds;
}
