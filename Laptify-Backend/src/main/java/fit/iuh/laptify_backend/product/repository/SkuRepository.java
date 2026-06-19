package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.entity.Sku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkuRepository extends JpaRepository<Sku, String> {
    @Query("""
    SELECT sku FROM Sku sku
    JOIN FETCH sku.product p
    WHERE sku.skuCode IN (:skuCodes)
    ORDER BY sku.skuCode
""")
    List<Sku> findSkusWithProductByCode(@Param("skuCodes") List<String> skuCodes);

    /**
     * Trừ kho nguyên tử (compare-and-set): chỉ trừ khi còn đủ hàng. Trả về số dòng bị ảnh hưởng —
     * 1 nếu trừ thành công, 0 nếu hết hàng. Đây là điểm chống oversell mà không cần khóa bi quan.
     */
    @Modifying
    @Query("""
    UPDATE Sku s
    SET s.stockQuantity = s.stockQuantity - :qty,
        s.totalPurchases = s.totalPurchases + 1
    WHERE s.skuCode = :skuCode AND s.stockQuantity >= :qty
""")
    int deductIfAvailable(@Param("skuCode") String skuCode, @Param("qty") int qty);

    /** Hoàn kho (bù trừ khi một dòng trong đơn hết hàng, hoặc khi đơn hết hạn/hủy). */
    @Modifying
    @Query("""
    UPDATE Sku s
    SET s.stockQuantity = s.stockQuantity + :qty,
        s.totalPurchases = CASE WHEN s.totalPurchases > 0 THEN s.totalPurchases - 1 ELSE 0 END
    WHERE s.skuCode = :skuCode
""")
    int restock(@Param("skuCode") String skuCode, @Param("qty") int qty);

}
