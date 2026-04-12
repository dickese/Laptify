package fit.iuh.laptify_backend.product.service.impl;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductCreationRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.dto.response.ProductResponse;
import fit.iuh.laptify_backend.product.entity.Brand;
import fit.iuh.laptify_backend.product.entity.Category;
import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.BrandRepository;
import fit.iuh.laptify_backend.product.repository.CategoryRepository;
import fit.iuh.laptify_backend.product.repository.ProductRepository;
import fit.iuh.laptify_backend.product.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

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

    @Override
    public ProductResponse createProduct(ProductCreationRequest request) {
        Category category = getCategory(request.getCategoryId());
        Brand brand = getBrand(request.getBrandId());

        Product product = buildProduct(request, category, brand);

        List<ProductCreationRequest.SkuInfo> skuInfos = request.getSkus();

        List<String> imageUrls = uploadSkuImages(skuInfos);

        List<Sku> skus = buildSkus(skuInfos, imageUrls, product);

        skus.forEach(product::addSku);

        productRepository.save(product);

        return mapToResponse(product);
    }


    private Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Category not found with id: " + categoryId
                ));
    }

    private Brand getBrand(Long brandId) {
        return brandRepository.findById(brandId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Brand not found with id: " + brandId
                ));
    }

    private Product buildProduct(ProductCreationRequest request,
                                 Category category,
                                 Brand brand) {

        return new Product(
                request.getName(),
                request.getDescription(),
                category,
                brand
        );
    }

    private List<String> uploadSkuImages(List<ProductCreationRequest.SkuInfo> skuInfos) {
        List<MultipartFile> images = skuInfos.stream()
                .map(ProductCreationRequest.SkuInfo::getImage)
                .toList();

//        List<String> imageUrls = uploadBatch(images);
//
//        if (imageUrls.size() != images.size()) {
//            throw new IllegalArgumentException("Require image for all sku");
//        }

        return null;
    }

    private List<Sku> buildSkus(List<ProductCreationRequest.SkuInfo> skuInfos,
                                List<String> imageUrls,
                                Product product) {

        List<Sku> skus = new ArrayList<>();

        for (int i = 0; i < skuInfos.size(); i++) {
            ProductCreationRequest.SkuInfo skuReq = skuInfos.get(i);

            Sku sku = new Sku(
                    generateSkuCode(),
                    skuReq.getColor(),
                    skuReq.getPrice(),
                    skuReq.getStockQuantity(),
                    product
            );

            sku.setImageUrl(imageUrls.get(i));

            skus.add(sku);
        }

        return skus;
    }

    private ProductResponse mapToResponse(Product product) {
        return null;
    }

    private String generateSkuCode(){
        return "";
    }

}
