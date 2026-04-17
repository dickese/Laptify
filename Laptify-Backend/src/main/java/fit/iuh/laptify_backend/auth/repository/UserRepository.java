package fit.iuh.laptify_backend.auth.repository;

import fit.iuh.laptify_backend.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
