package fit.iuh.laptify_backend.cart.service.impl;

import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.service.AuthService;
import fit.iuh.laptify_backend.cart.dto.request.CartAdditionRequest;
import fit.iuh.laptify_backend.cart.dto.response.CartResponse;
import fit.iuh.laptify_backend.cart.entity.Cart;
import fit.iuh.laptify_backend.cart.entity.CartDetail;
import fit.iuh.laptify_backend.cart.repository.CartRepository;
import fit.iuh.laptify_backend.cart.service.CartService;
import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;


    @Override
    public CartResponse getSelfCart() {
        Cart cart = authService.getCurrentUser().getCart();
        return mapEntityToResponse(cart);
    }

    @Override
    public CartResponse addToCart(CartAdditionRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        Sku sku = product.getSkus().stream()
                .filter(item -> item.getSkuCode().equalsIgnoreCase(request.getSkuCode()))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Sku not found"));

        if(request.getQuantity() > sku.getStockQuantity()){
            throw new IllegalArgumentException("Sku stock isn't enough");
        }

        Cart cart = authService.getCurrentUser().getCart();

        CartDetail cartDetail = new CartDetail(
                sku,
                cart,
                request.getQuantity()
        );

        cart.addItem(cartDetail);
        return mapEntityToResponse(cartRepository.saveAndFlush(cart));
    }

    private CartResponse mapEntityToResponse(Cart cart){
        List<CartResponse.CartDetailInfo> cartDetailInfos = cart.getCartDetails().stream().map(item -> {
            Sku sku = item.getSku();
            return new CartResponse.CartDetailInfo(
                    sku.getProduct().getName(),
                    sku.getColor(),
                    sku.getStockQuantity(),
                    sku.getPrice(),
                    item.getCreatedAt()

            );
        }).toList();

        return new CartResponse(cartDetailInfos);
    }
}
