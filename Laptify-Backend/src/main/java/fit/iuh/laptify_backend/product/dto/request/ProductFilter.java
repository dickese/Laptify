package fit.iuh.laptify_backend.product.dto.request;

import lombok.Getter;

@Getter
public class ProductFilter {
    private String keyword;
    private String categoryId;
    private Double minPrice;
    private Double maxPrice;
}
