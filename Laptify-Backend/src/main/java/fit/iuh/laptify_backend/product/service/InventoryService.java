package fit.iuh.laptify_backend.product.service;

import java.util.List;
import java.util.Optional;

/**
 * Giữ/hoàn tồn kho cho đơn hàng. Tồn kho được trừ tại "điểm cam kết" (hiện tại là lúc tạo đơn,
 * cho cả COD lẫn online) bằng câu UPDATE có điều kiện nguyên tử {@code stock >= qty}, nên chỉ
 * một người thắng được tồn kho và đi tiếp vào quy trình; không cần khóa bi quan để chống oversell.
 */
public interface InventoryService {

    /** Một dòng thay đổi tồn kho cho một SKU. */
    record StockChange(String skuCode, int quantity) {}

    /**
     * Trừ kho nguyên tử cho TẤT CẢ các dòng. Nếu một dòng hết hàng, các dòng đã trừ trước đó được
     * hoàn lại (bù trừ) và trả về {@code skuCode} bị hết hàng. Trả về {@link Optional#empty()} nếu
     * trừ thành công toàn bộ.
     */
    Optional<String> tryReserve(List<StockChange> changes);

    /** Hoàn kho cho tất cả các dòng (khi đơn hết hạn/bị hủy sau khi đã trừ kho). */
    void release(List<StockChange> changes);
}