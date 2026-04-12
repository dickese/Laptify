package fit.iuh.laptify_backend.product.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

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

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @ToString.Exclude
    private Product product;

    public Sku(String skuCode, String color, BigDecimal price, Integer stockQuantity, Product product) {
        this.skuCode = skuCode;
        this.color = color;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.product = product;
    }
}
