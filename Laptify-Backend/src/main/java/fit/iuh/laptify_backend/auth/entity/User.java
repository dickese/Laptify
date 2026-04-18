package fit.iuh.laptify_backend.auth.entity;

import fit.iuh.laptify_backend.cart.entity.Cart;
import fit.iuh.laptify_backend.order.entity.UserPlacementInfo;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Cart cart;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<UserPlacementInfo> userPlacementInfos;

    public User(String email, String name, String password) {
        this.password = password;
        this.email = email;
        this.name = name;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
        if (cart != null) {
            cart.setUser(this);
        }
    }
}
