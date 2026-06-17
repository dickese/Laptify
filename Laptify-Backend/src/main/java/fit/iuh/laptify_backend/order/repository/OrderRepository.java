package fit.iuh.laptify_backend.order.repository;

import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.entity.Order;
import fit.iuh.laptify_backend.order.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    Optional<Order> findByTrackingCode(String trackingCode);

    /** Đơn ở trạng thái {@code status} được tạo trước mốc {@code cutoff} — dùng cho job hết hạn thanh toán. */
    List<Order> findByStatusAndOrderDateBefore(OrderStatus status, Instant cutoff);

    @Query(value = "SELECT " +
            "o.id, " +
            "upi.customer_name, " +
            "upi.phone_number, " +
            "o.order_date, " +
            "o.total_price, " +
            "o.status " +
            "FROM orders o " +
            "JOIN user_placement_infos upi ON o.user_placement_info_id = upi.id " +
            "ORDER BY o.order_date DESC",
            countQuery = "SELECT COUNT(*) FROM orders",
            nativeQuery = true)
    Page<OrderDisplayResponse> findAllOrdersWithPagination(Pageable pageable);

    @Query(value = """
        SELECT o.id,
            upi.customer_name,
            upi.phone_number,
            o.order_date,
            o.total_price,
            o.status
        FROM orders o
        JOIN user_placement_infos upi 
            ON o.user_placement_info_id = upi.id
        WHERE upi.user_id = :userId
        ORDER BY o.order_date DESC
        """,
            countQuery = """
        SELECT COUNT(*)
        FROM orders o
        JOIN user_placement_infos upi ON o.user_placement_info_id = upi.id
        WHERE upi.user_id = :userId
        """,
            nativeQuery = true)
    Page<OrderDisplayResponse> findAllOrdersWithPaginationByUserId(
            Pageable pageable,
            @Param("userId") Long userId
    );
}
