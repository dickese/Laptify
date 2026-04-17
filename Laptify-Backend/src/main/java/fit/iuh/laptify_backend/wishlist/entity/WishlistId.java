package fit.iuh.laptify_backend.wishlist.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class WishlistId implements java.io.Serializable {
    private Long userId;
    private Long productId;
}
