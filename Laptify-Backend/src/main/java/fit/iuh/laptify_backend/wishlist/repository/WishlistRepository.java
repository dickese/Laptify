package fit.iuh.laptify_backend.wishlist.repository;

import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.wishlist.entity.Wishlist;
import fit.iuh.laptify_backend.wishlist.entity.WishlistId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, WishlistId> {
    List<Wishlist> findByUserId(Long userId);
    Optional<Wishlist> findByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);

    @Query("SELECT w FROM Wishlist w " +
           "JOIN FETCH w.product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE s.stockQuantity >= 1 " +
           "AND w.user.id = :userId " +
           "ORDER BY w.createdAt DESC")
    Page<Wishlist> getProductsInWishlist(Long userId, Pageable pageable);
}
