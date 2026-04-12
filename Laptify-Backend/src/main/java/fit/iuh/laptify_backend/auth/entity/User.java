package fit.iuh.laptify_backend.auth.entity;

import jakarta.persistence.*;
import lombok.*;

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
}
