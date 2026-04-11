package fit.iuh.laptify_backend.product.service;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getNewProducts(PageRequest page);
    List<Product> getBestSellerProducts(PageRequest page);
    List<Product> getProductsByCategoryId(Long categoryId, PageRequest page);
    List<Product> getProductsWithFilter (ProductFilter productFilter, PageRequest page);
    Product getProductById(Long id);
}
