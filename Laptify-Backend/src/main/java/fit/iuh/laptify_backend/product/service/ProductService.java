package fit.iuh.laptify_backend.product.service;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.dto.request.ProductCreationRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.dto.request.RelatedProductFetchingRequest;
import fit.iuh.laptify_backend.product.dto.response.ProductDetailResponse;
import fit.iuh.laptify_backend.product.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse createProduct(ProductCreationRequest request);
    PageResponse<List<ProductResponse>> getAllProducts(PageRequest page);
    PageResponse<List<ProductResponse>> getNewProducts(PageRequest page);
    PageResponse<List<ProductResponse>> getBestSellerProducts(PageRequest page);
    PageResponse<List<ProductResponse>> getProductsByCategoryId(Long categoryId, PageRequest page);
    PageResponse<List<ProductResponse>> getProductsWithFilter (ProductFilter productFilter, PageRequest page);
    PageResponse<List<ProductResponse>> getRelatedProducts(PageRequest page, RelatedProductFetchingRequest request);
    ProductDetailResponse getProductById(Long id);
}
