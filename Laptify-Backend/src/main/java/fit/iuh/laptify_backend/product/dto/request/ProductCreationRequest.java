package fit.iuh.laptify_backend.product.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ProductCreationRequest {
    private String name;
    private String description;
    private Long categoryId;
    private Long brandId;
    private List<SkuInfo> skus;

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class SkuInfo{
        private String color;
        private BigDecimal price;
        private Integer stockQuantity;
        private MultipartFile image;
    }
}
