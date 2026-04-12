package fit.iuh.laptify_backend.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    private Instant orderDate;
    private BigDecimal totalPrice;
    private BigDecimal shippingFee;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToMany(mappedBy = "order", orphanRemoval = true,cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_placement_info_id", nullable = false)
    private UserPlacementInfo userInfoPlacement;

    public BigDecimal getTotalDue(){
        return totalPrice.add(shippingFee);
    }
}
