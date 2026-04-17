package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @EntityGraph(attributePaths = "skus")
    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE s.stockQuantity >= 1 " +
           "ORDER BY p.createdAt DESC")
    Page<Product> findNewProducts(Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    Optional<Product> findById(Long id);

    @EntityGraph(attributePaths = "skus")
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "ORDER BY " +
           "CASE WHEN s.stockQuantity > 0 THEN 1 ELSE 0 END DESC, " +
           "s.stockQuantity DESC")
    Page<Product> findAllProducts(Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE p.category.id = :categoryId AND p.id <> :productId " +
           "AND s.stockQuantity >= 1" +
           "ORDER BY s.totalPurchases DESC, p.createdAt DESC")
    @EntityGraph(attributePaths = "skus")
    Page<Product> findRelatedProduct(Long categoryId, Long productId, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE s.stockQuantity >= 1" +
           "ORDER BY s.totalPurchases DESC, p.id ASC")
    @EntityGraph(attributePaths = "skus")
    Page<Product> findBestSellerProducts(Pageable pageable);
}
