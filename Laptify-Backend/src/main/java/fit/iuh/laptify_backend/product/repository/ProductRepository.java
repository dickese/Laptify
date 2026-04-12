package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
}
