package fit.iuh.laptify_backend.cart.controller;

import fit.iuh.laptify_backend.cart.dto.response.CartResponse;
import fit.iuh.laptify_backend.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carts")
public class CartController {
    private final CartService cartService;

    @GetMapping("me")
    public ResponseEntity<CartResponse> getSelfCart(){
        return ResponseEntity.ok(cartService.getSelfCart());
    }
}
