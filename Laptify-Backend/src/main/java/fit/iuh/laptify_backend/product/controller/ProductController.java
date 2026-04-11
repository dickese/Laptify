package fit.iuh.laptify_backend.product.controller;

import fit.iuh.laptify_backend.product.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
public class ProductController {
    private final ProductService productService;
}
