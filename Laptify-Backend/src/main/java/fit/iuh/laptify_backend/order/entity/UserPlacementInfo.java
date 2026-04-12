package fit.iuh.laptify_backend.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_placement_infos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPlacementInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String phoneNumber;
    private String address;
    private boolean isSaved;
}
