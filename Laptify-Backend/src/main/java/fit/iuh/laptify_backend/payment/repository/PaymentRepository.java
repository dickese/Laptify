package fit.iuh.laptify_backend.payment.repository;

import fit.iuh.laptify_backend.payment.entity.Payment;
import fit.iuh.laptify_backend.payment.entity.PaymentStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTransactionRef(String transactionRef);

    /** Khóa ghi trên payment khi xử lý IPN để hai IPN trùng cho cùng giao dịch không advance order hai lần. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Payment p where p.transactionRef = :ref")
    Optional<Payment> findByTransactionRefForUpdate(@Param("ref") String ref);

    boolean existsByOrderIdAndStatus(Long orderId, PaymentStatus status);

    List<Payment> findByOrderIdAndStatus(Long orderId, PaymentStatus status);
}