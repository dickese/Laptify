package fit.iuh.laptify_backend.auth.repository;

import fit.iuh.laptify_backend.auth.entity.Role;
import fit.iuh.laptify_backend.auth.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleName name);
}
