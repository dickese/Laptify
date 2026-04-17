package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.dto.request.ProductFilter;
import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.product.entity.Sku;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> getSpecification(ProductFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getKeyword() != null && !filter.getKeyword().isEmpty()) {
                String keyword = "%" + filter.getKeyword().toLowerCase() + "%";
                Predicate namePredicate =
                        cb.like(cb.lower(root.get("name")), keyword);
                Predicate descriptionPredicate =
                        cb.like(cb.lower(root.get("description")), keyword);
                predicates.add(cb.or(namePredicate, descriptionPredicate));
            }

            if (filter.getBrandCode() != null && !filter.getBrandCode().isEmpty()) {
                String getBrandCode = filter.getBrandCode();
                predicates.add(cb.equal(root.get("brand").get("code"), getBrandCode));
            }

            if (filter.getCategoryId() != null && !filter.getCategoryId().isEmpty()) {
                Long categoryId = Long.parseLong(filter.getCategoryId());
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }

            if ((filter.getMinPrice() != null || filter.getMaxPrice() != null)) {
                Join<Product, Sku> skuJoin = root.join("skus");

                if (filter.getMinPrice() != null && filter.getMaxPrice() != null) {
                    predicates.add(cb.between(
                            skuJoin.get("price"),
                            BigDecimal.valueOf(filter.getMinPrice()),
                            BigDecimal.valueOf(filter.getMaxPrice())
                    ));
                } else
                    if (filter.getMinPrice() != null) {
                        predicates.add(cb.greaterThanOrEqualTo(
                                skuJoin.get("price"),
                                BigDecimal.valueOf(filter.getMinPrice())
                        ));
                    } else
                        if (filter.getMaxPrice() != null) {
                            predicates.add(cb.lessThanOrEqualTo(
                                    skuJoin.get("price"),
                                    BigDecimal.valueOf(filter.getMaxPrice())
                            ));
                        }
            }

            predicates.add(cb.greaterThanOrEqualTo(root.get("skus").get("stockQuantity"), 1));

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

