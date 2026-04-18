package fit.iuh.laptify_backend.product.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sku {
    @Id
    @Column(name = "sku_code", nullable = false, unique = true, length = 100)
    private String skuCode;

    @Column(name = "color", nullable = false, length = 50)
    private String color;

    @Column(name = "price", nullable = false)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Column(name = "total_purchases", nullable = false)
    private Integer totalPurchases = 0;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "media_metadata", columnDefinition = "json")
    private List<MediaMetadata> mediaMetadata = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @ToString.Exclude
    private Product product;

    public Sku(String skuCode, String color, BigDecimal price, Integer stockQuantity, List<MediaMetadata> mediaMetadata, Product product) {
        this.skuCode = skuCode;
        this.color = color;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.mediaMetadata = mediaMetadata;
        this.product = product;
    }
}
