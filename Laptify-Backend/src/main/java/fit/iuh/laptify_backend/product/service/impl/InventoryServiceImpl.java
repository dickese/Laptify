package fit.iuh.laptify_backend.product.service.impl;

import fit.iuh.laptify_backend.product.repository.SkuRepository;
import fit.iuh.laptify_backend.product.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryServiceImpl implements InventoryService {

    private final SkuRepository skuRepository;

    /**
     * Trừ từng dòng bằng compare-and-set ở DB. Nếu một dòng
     * hết hàng giữa chừng, hoàn lại các dòng đã trừ để không "rò rỉ" tồn kho ở những caller không
     * rollback (ví dụ luồng late-success đánh dấu hoàn tiền rồi vẫn commit).
     */
    @Override
    public Optional<String> tryReserve(List<StockChange> changes) {
        if (changes == null || changes.isEmpty()) {
            return Optional.empty();
        }
        List<StockChange> reserved = new ArrayList<>();
        for (StockChange change : changes) {
            int updated = skuRepository.deductIfAvailable(change.skuCode(), change.quantity());
            if (updated == 0) {
                reserved.forEach(r -> skuRepository.restock(r.skuCode(), r.quantity()));
                log.warn("Out of stock for sku {} (qty {}) -> reservation rolled back", change.skuCode(), change.quantity());
                return Optional.of(change.skuCode());
            }
            reserved.add(change);
        }
        return Optional.empty();
    }

    @Override
    public void release(List<StockChange> changes) {
        if (changes == null) {
            return;
        }
        changes.forEach(change -> skuRepository.restock(change.skuCode(), change.quantity()));
    }
}
