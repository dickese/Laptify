package fit.iuh.laptify_backend.payment.repository;

import fit.iuh.laptify_backend.payment.entity.Payment;
import fit.iuh.laptify_backend.payment.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTransactionRef(String transactionRef);

    boolean existsByOrderIdAndStatus(Long orderId, PaymentStatus status);

    List<Payment> findByOrderIdAndStatus(Long orderId, PaymentStatus status);
}