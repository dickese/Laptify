package fit.iuh.laptify_backend.order.repository;

import fit.iuh.laptify_backend.order.entity.Order;
import org.hibernate.boot.models.JpaAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByTrackingCode(String trackingCode);
}
