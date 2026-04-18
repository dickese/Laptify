package fit.iuh.laptify_backend.product.controller;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.dto.request.ProductCreationRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.dto.request.RelatedProductFetchingRequest;
import fit.iuh.laptify_backend.product.dto.response.ProductDetailResponse;
import fit.iuh.laptify_backend.product.dto.response.ProductResponse;
import fit.iuh.laptify_backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Slf4j
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductCreationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @GetMapping("")
    public ResponseEntity<PageResponse<List<ProductResponse>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size)
    {
        PageRequest pageRequest = new PageRequest(page, size);
        return ResponseEntity.ok(productService.getAllProducts(pageRequest));
    }

    @GetMapping("/news")
    public ResponseEntity<PageResponse<List<ProductResponse>>> getNewProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size)
    {
        PageRequest pageRequest = new PageRequest(page, size);
        return ResponseEntity.ok(productService.getNewProducts(pageRequest));
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<PageResponse<List<ProductResponse>>> getBestSellerProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size)
    {
        PageRequest pageRequest = new PageRequest(page, size);
        return ResponseEntity.ok(productService.getBestSellerProducts(pageRequest));
    }

    @GetMapping("/{product_id}/related")
    public ResponseEntity<PageResponse<List<ProductResponse>>> getProductsByCategoryId(
            @PathVariable("product_id") Long productId,
            @RequestParam("category_id") Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size)
    {
        PageRequest pageRequest = new PageRequest(page, size);
        RelatedProductFetchingRequest request = new RelatedProductFetchingRequest(productId, categoryId);
        return ResponseEntity.ok(productService.getRelatedProducts(pageRequest, request));
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<List<ProductResponse>>> getProductsWithFilter(
            @ModelAttribute ProductFilter productFilter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size)
    {
        PageRequest pageRequest = new PageRequest(page, size);
        return ResponseEntity.ok(productService.getProductsWithFilter(productFilter, pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}

