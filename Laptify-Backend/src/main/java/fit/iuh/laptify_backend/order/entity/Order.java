package fit.iuh.laptify_backend.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

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
    private Long id;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant orderDate;

    @Column(updatable = false)
    private BigDecimal totalPrice;

    @Column(updatable = false)
    private BigDecimal shippingFee;

    @Column(updatable = false)
    private String trackingCode;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToMany(mappedBy = "order", orphanRemoval = true,cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_placement_info_id", nullable = false)
    private UserPlacementInfo userInfoPlacement;

    public BigDecimal getTotalDue(){
        return totalPrice.add(shippingFee);
    }

    public Order(UserPlacementInfo userInfoPlacement) {
        this.orderDate = Instant.now();
        this.status = OrderStatus.PENDING;
        this.userInfoPlacement = userInfoPlacement;
    }
}
