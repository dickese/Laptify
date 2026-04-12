package fit.iuh.laptify_backend.order.entity;

import fit.iuh.laptify_backend.product.entity.Sku;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "order_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal priceAtPurchase;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sku_code", nullable = false)
    private Sku sku;

    public BigDecimal getSubTotal(){
        return priceAtPurchase.multiply(BigDecimal.valueOf(quantity));
    }
}
