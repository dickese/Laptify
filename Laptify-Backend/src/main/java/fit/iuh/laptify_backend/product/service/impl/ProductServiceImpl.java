package fit.iuh.laptify_backend.product.service.impl;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.product.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j

public class ProductServiceImpl implements ProductService {
    @Override
    public List<Product> getNewProducts(PageRequest page) {
        return List.of();
    }

    @Override
    public List<Product> getBestSellerProducts(PageRequest page) {
        return List.of();
    }

    @Override
    public List<Product> getProductsByCategoryId(Long categoryId, PageRequest page) {
        return List.of();
    }

    @Override
    public List<Product> getProductsWithFilter(ProductFilter productFilter, PageRequest page) {
        return List.of();
    }

    @Override
    public Product getProductById(Long id) {
        return null;
    }
}
