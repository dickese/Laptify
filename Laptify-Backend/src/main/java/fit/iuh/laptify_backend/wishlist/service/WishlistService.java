package fit.iuh.laptify_backend.wishlist.service;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.wishlist.dto.ProductInWishlistResponse;
import fit.iuh.laptify_backend.wishlist.dto.WishlistRequest;
import fit.iuh.laptify_backend.wishlist.dto.UserWishlistResponse;

import java.util.List;

public interface WishlistService {
    void addToWishlist(WishlistRequest request);
    void removeFromWishlist(WishlistRequest request);
    UserWishlistResponse getUserWishlist(Long userId);
    PageResponse<List<ProductInWishlistResponse>> getProductsInWishlist(Long userId, PageRequest request);
}
