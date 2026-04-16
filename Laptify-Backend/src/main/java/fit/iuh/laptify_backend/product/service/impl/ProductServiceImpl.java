package fit.iuh.laptify_backend.product.service.impl;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.dto.request.ProductCreationRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.dto.response.ProductDetailResponse;
import fit.iuh.laptify_backend.product.dto.response.ProductResponse;
import fit.iuh.laptify_backend.product.dto.response.ProductSkuResponse;
import fit.iuh.laptify_backend.product.entity.*;
import fit.iuh.laptify_backend.product.repository.BrandRepository;
import fit.iuh.laptify_backend.product.repository.CategoryRepository;
import fit.iuh.laptify_backend.product.repository.ProductRepository;
import fit.iuh.laptify_backend.product.repository.ProductSpecification;
import fit.iuh.laptify_backend.product.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    @Override
    public PageResponse<List<ProductResponse>> getNewProducts(PageRequest page) {
        org.springframework.data.domain.PageRequest pageable = toPageable(page, Sort.by("createdAt").descending());
        Page<Product> products = productRepository.findAllByOrderByCreatedAtDesc(pageable);
        Page<ProductResponse> productResponses = products.map(this::mapToResponse);
        return buildPageResponse(productResponses);
    }

    @Override
    public PageResponse<List<ProductResponse>> getBestSellerProducts(PageRequest page) {
        org.springframework.data.domain.PageRequest pageable = toPageable(page);
        Page<Product> products = productRepository.findBestSellerProducts(pageable);
        Page<ProductResponse> productResponses = products.map(this::mapToResponse);
        return buildPageResponse(productResponses);
    }

    @Override
    public PageResponse<List<ProductResponse>> getProductsByCategoryId(Long categoryId, PageRequest page) {
        org.springframework.data.domain.PageRequest pageable = toPageable(page);
        Page<Product> products = productRepository.findByCategoryId(categoryId, pageable);
        Page<ProductResponse> productResponses = products.map(this::mapToResponse);
        return buildPageResponse(productResponses);
    }

    @Override
    public PageResponse<List<ProductResponse>> getProductsWithFilter(ProductFilter productFilter, PageRequest page) {
        log.info("Filtering products with criteria: {}", productFilter);
        org.springframework.data.domain.PageRequest pageable = toPageable(page);
        Page<Product> products = productRepository.findAll(ProductSpecification.getSpecification(productFilter), pageable);
        Page<ProductResponse> productResponses = products.map(this::mapToResponse);
        return buildPageResponse(productResponses);
    }

    @Override
    public ProductDetailResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        return mapToProductDetailResponse(product);
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
                    0,
                    // TODO: map imageUrls.get(i) to mediaMetadata
                    null,
                    product
            );

            skus.add(sku);
        }

        return skus;
    }

    private String generateSkuCode(){
        return "";
    }

    private org.springframework.data.domain.PageRequest toPageable(PageRequest pageRequest) {
        return toPageable(pageRequest, Sort.unsorted());
    }

    private org.springframework.data.domain.PageRequest toPageable(PageRequest pageRequest, Sort sort) {
        return org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), sort);
    }

    private Sku getFirstSkuOrThrow(Product product) {
        if (product.getSkus() == null || product.getSkus().isEmpty()) {
            throw new RuntimeException(
                    "No SKUs found for product with id: " + product.getId()
            );
        }
        return product.getSkus().get(0);
    }

    private ProductResponse mapToResponse(Product product) {
        Sku firstSku = getFirstSkuOrThrow(product);

        return ProductResponse.builder()
                .id(String.valueOf(product.getId()))
                .name(product.getName())
                .price(firstSku.getPrice())
                .totalPurchases(firstSku.getTotalPurchases())
                .mediaMetadata(firstSku.getMediaMetadata().getFirst())
                .build();
    }

    private ProductDetailResponse mapToProductDetailResponse(Product product) {
        List<ProductSkuResponse> skuResponses = product.getSkus().stream()
                .map(sku -> ProductSkuResponse.builder()
                        .skuCode(sku.getSkuCode())
                        .color(sku.getColor())
                        .price(sku.getPrice())
                        .stockQuantity(sku.getStockQuantity())
                        .build())
                .collect(Collectors.toList());

        Sku firstSku = getFirstSkuOrThrow(product);

        return ProductDetailResponse.builder()
                .id(String.valueOf(product.getId()))
                .name(product.getName())
                .categoryId(String.valueOf(product.getCategory().getId()))
                .brandId(String.valueOf(product.getBrand().getId()))
                .price(firstSku.getPrice())
                .totalPurchases(firstSku.getTotalPurchases())
                .skus(skuResponses)
                .build();
    }

    private <T> PageResponse<List<T>> buildPageResponse(Page<T> page) {
        return PageResponse.<List<T>>builder()
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .hasNext(page.hasNext())
                .data(page.getContent())
                .build();
    }
}
