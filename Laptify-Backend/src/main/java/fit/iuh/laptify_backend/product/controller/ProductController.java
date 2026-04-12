package fit.iuh.laptify_backend.product.controller;

import fit.iuh.laptify_backend.product.dto.request.ProductCreationRequest;
import fit.iuh.laptify_backend.product.dto.response.ProductResponse;
import fit.iuh.laptify_backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    public ResponseEntity<ProductResponse> createProduct(ProductCreationRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }
}
