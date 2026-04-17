package fit.iuh.laptify_backend.wishlist.controller;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.wishlist.dto.ProductInWishlistResponse;
import fit.iuh.laptify_backend.wishlist.dto.WishlistRequest;
import fit.iuh.laptify_backend.wishlist.dto.UserWishlistResponse;
import fit.iuh.laptify_backend.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlists")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    // TODO: Replace @RequestBody with @AuthenticationPrincipal to get userId from token
    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(
            @RequestParam(defaultValue = "1") Long userId,
            @RequestBody Long productId

//            @AuthenticationPrincipal(expression = "id") Long userId,
//            @RequestBody Long productId,
    ) {

        WishlistRequest request = new WishlistRequest(userId, productId);
        wishlistService.addToWishlist(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Added to wishlist");
    }

    // TODO: Replace @RequestBody with @AuthenticationPrincipal to get userId from token
    @DeleteMapping("/{product_id}")
    public ResponseEntity<?> removeFromWishlist(
            @RequestParam(defaultValue = "1") Long userId,
            @PathVariable("product_id") Long productId
//            @AuthenticationPrincipal(expression = "id") Long userId,
//            @RequestBody Long productId
    ) {
        WishlistRequest request = new WishlistRequest(userId, productId);
        wishlistService.removeFromWishlist(request);
        return ResponseEntity.ok("Removed from wishlist");
    }

    // TODO: Replace @RequestBody with @AuthenticationPrincipal to get userId from token
    @GetMapping("")
    public ResponseEntity<UserWishlistResponse> getUserWishlist(
            @RequestParam(defaultValue = "1") Long userId
//            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        return ResponseEntity.ok(wishlistService.getUserWishlist(userId));
    }

    // TODO: Replace @RequestBody with @AuthenticationPrincipal to get userId from token
    @GetMapping("/products")
    public ResponseEntity<PageResponse<List<ProductInWishlistResponse>>> getUserWishlistProducts(
            @RequestParam(defaultValue = "1") Long userId,

//            @AuthenticationPrincipal(expression = "id") Long userId
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        PageRequest pageRequest = new PageRequest(page, size);
        return ResponseEntity.ok(wishlistService.getProductsInWishlist(userId, pageRequest));
    }
}
