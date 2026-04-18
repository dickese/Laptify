package fit.iuh.laptify_backend.cart.service;

import fit.iuh.laptify_backend.cart.dto.request.CartAdditionRequest;
import fit.iuh.laptify_backend.cart.dto.response.CartResponse;

public interface CartService {
    CartResponse addToCart(CartAdditionRequest request);
    CartResponse getSelfCart();
}
