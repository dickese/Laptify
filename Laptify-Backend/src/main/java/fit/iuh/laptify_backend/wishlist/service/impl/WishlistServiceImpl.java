package fit.iuh.laptify_backend.wishlist.service.impl;

import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.repository.UserRepository;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.dto.response.ProductResponse;
import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.ProductRepository;
import fit.iuh.laptify_backend.wishlist.dto.ProductInWishlistResponse;
import fit.iuh.laptify_backend.wishlist.dto.UserWishlistResponse;
import fit.iuh.laptify_backend.wishlist.dto.WishlistRequest;
import fit.iuh.laptify_backend.wishlist.entity.Wishlist;
import fit.iuh.laptify_backend.wishlist.entity.WishlistId;
import fit.iuh.laptify_backend.wishlist.repository.WishlistRepository;
import fit.iuh.laptify_backend.wishlist.service.WishlistService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void addToWishlist(WishlistRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (wishlistRepository.findByUserIdAndProductId(request.getUserId(), request.getProductId()).isEmpty()) {
            Wishlist wishlist = new Wishlist();
            wishlist.setId(new WishlistId(request.getUserId(), request.getProductId()));
            wishlist.setUser(user);
            wishlist.setProduct(product);
            wishlistRepository.save(wishlist);
        }
    }

    @Override
    @Transactional
    public void removeFromWishlist(WishlistRequest request) {
        wishlistRepository.deleteByUserIdAndProductId(request.getUserId(), request.getProductId());
    }

    @Override
    public UserWishlistResponse getUserWishlist(Long userId) {
        List<Long> wishlistProducts = wishlistRepository.findByUserId(userId).stream()
                .map(wishlist -> wishlist.getId().getProductId())
                .toList();

        return new UserWishlistResponse(wishlistProducts);
    }

    @Override
    public PageResponse<List<ProductInWishlistResponse>> getProductsInWishlist(Long userId, PageRequest request) {
        org.springframework.data.domain.PageRequest pageable = toPageable(request);
        Page<Wishlist> wishlists = wishlistRepository.getProductsInWishlist(userId, pageable);
        Page<ProductInWishlistResponse> productsInWishlist = wishlists.map(this::mapToWishlistResponse);
        return buildPageResponse(productsInWishlist);
    }

    private ProductInWishlistResponse mapToWishlistResponse(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        ProductResponse productResponse = mapToProductResponse(product);

        return new ProductInWishlistResponse(
                productResponse,
                wishlist.getCreatedAt()
        );
    }


    private org.springframework.data.domain.PageRequest toPageable(PageRequest pageRequest) {
        return org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), Sort.unsorted());
    }

    private ProductResponse mapToProductResponse(Product product) {
        Sku firstSku = getFirstSkuOrThrow(product);

        return ProductResponse.builder()
                              .id(String.valueOf(product.getId()))
                              .name(product.getName())
                              .price(firstSku.getPrice())
                              .totalPurchases(firstSku.getTotalPurchases())
                              .stockQuantity(firstSku.getStockQuantity())
                              .mediaMetadata(firstSku.getMediaMetadata() != null ? firstSku.getMediaMetadata().getFirst() : null)
                              .build();
    }

    private Sku getFirstSkuOrThrow(Product product) {
        if (product.getSkus() == null || product.getSkus().isEmpty()) {
            throw new RuntimeException(
                    "No SKUs found for product with id: " + product.getId()
            );
        }
        return product.getSkus().get(0);
    }

    private <T> PageResponse<List<T>> buildPageResponse(Page<T> page) {
        return PageResponse.<List<T>>builder()
                           .page(page.getNumber())
                           .size(page.getSize())
                           .totalElements(page.getTotalElements())
                           .totalPages(page.getTotalPages())
                           .hasNext(page.hasNext())
                           .data(page.getContent())
                           .build();
    }
}
