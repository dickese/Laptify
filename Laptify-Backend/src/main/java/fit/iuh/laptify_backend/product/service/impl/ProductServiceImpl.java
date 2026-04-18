package fit.iuh.laptify_backend.product.service.impl;

import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.dto.request.ProductCreationRequest;
import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.dto.request.RelatedProductFetchingRequest;
import fit.iuh.laptify_backend.product.dto.response.MediaMetadataResponse;
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
import org.springframework.transaction.support.TransactionTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final TransactionTemplate transactionTemplate;

    @Override
    public PageResponse<List<ProductResponse>> getAllProducts(PageRequest page) {
        org.springframework.data.domain.PageRequest pageable = toPageable(page);
        Page<Product> products = productRepository.findAllProducts(pageable);
        Page<ProductResponse> productResponses = products.map(this::mapToResponse);
        return buildPageResponse(productResponses);
    }

    @Override
    public PageResponse<List<ProductResponse>> getNewProducts(PageRequest page) {
        org.springframework.data.domain.PageRequest pageable = toPageable(page, Sort.by("createdAt").descending());
        Page<Product> products = productRepository.findNewProducts(pageable);
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
    public PageResponse<List<ProductResponse>> getRelatedProducts(PageRequest page,
                                                                  RelatedProductFetchingRequest request) {
        org.springframework.data.domain.PageRequest pageable = toPageable(page);
        Page<Product> products = productRepository.findRelatedProduct(request.getProductId(), request.getCategoryId(), pageable);
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
        // Generate new productId
        Long productId = System.currentTimeMillis();
        List<String> skuCodes = generateSkuCodes(request.getSkus().size());

        return transactionTemplate.execute(status -> saveProductWithSkus(
                productId,
                request,
                skuCodes
        ));
    }

    public ProductResponse saveProductWithSkus(
            Long productId,
            ProductCreationRequest request,
            List<String> skuCodes
    ) {
        Category category = getCategory(request.getCategoryId());
        Brand brand = getBrand(request.getBrandId());

        Product product = buildProduct(request, productId, category, brand);
        product.setId(productId);

        List<Sku> skus = buildSkus(
                request.getSkus(),
                skuCodes,
                product
        );

        skus.forEach(product::addSku);

        return mapToResponse(productRepository.save(product));
    }

    private List<String> generateSkuCodes(int size) {
        List<String> codes = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            codes.add(generateSkuCode());
        }
        return codes;
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
                                 Long productId,
                                 Category category,
                                 Brand brand) {

        return new Product(
                productId,
                request.getName(),
                request.getDescription(),
                category,
                brand
        );
    }

    private List<Sku> buildSkus(List<ProductCreationRequest.SkuInfo> skuInfos,
                                List<String> skuCodes,
                                Product product) {

        List<Sku> skus = new ArrayList<>();

        for (int i = 0; i < skuInfos.size(); i++) {
            ProductCreationRequest.SkuInfo skuReq = skuInfos.get(i);

            Sku sku = new Sku(
                    skuCodes.get(i),
                    skuReq.getColor(),
                    skuReq.getPrice(),
                    skuReq.getStockQuantity(),
                    skuReq.getImages(),
                    product
            );

            skus.add(sku);
        }

        return skus;
    }

    private String generateSkuCode(){
        return UUID.randomUUID().toString();
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
                .stockQuantity(firstSku.getStockQuantity())
                .mediaMetadata(firstSku.getMediaMetadata() != null ? firstSku.getMediaMetadata().getFirst() : null)
                .build();
    }

    private ProductDetailResponse mapToProductDetailResponse(Product product) {
        List<ProductSkuResponse> skuResponses = product.getSkus().stream()
                .map(sku -> ProductSkuResponse.builder()
                        .skuCode(sku.getSkuCode())
                        .color(sku.getColor())
                        .price(sku.getPrice())
                        .totalPurchases(sku.getTotalPurchases())
                        .stockQuantity(sku.getStockQuantity())
                        .mediaMetadataList(mapToMediaMetadataResponse(sku.getMediaMetadata()))
                        .build())
                .collect(Collectors.toList());

        Sku firstSku = getFirstSkuOrThrow(product);

        return ProductDetailResponse.builder()
                .id(String.valueOf(product.getId()))
                .name(product.getName())
                .categoryId(String.valueOf(product.getCategory().getId()))
                .brandId(String.valueOf(product.getBrand().getId()))
                .skus(skuResponses)
                .build();
    }

    private List<MediaMetadataResponse> mapToMediaMetadataResponse(List<MediaMetadata> mediaMetadata) {
        if (mediaMetadata == null || mediaMetadata.isEmpty()) {
            return new ArrayList<>();
        }

        return mediaMetadata.stream()
                .map(meta -> MediaMetadataResponse.builder()
                        .url(meta.getUrl())
                        .width(meta.getWidth())
                        .height(meta.getHeight())
                        .format(meta.getFormat())
                        .build())
                .collect(Collectors.toList());
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
