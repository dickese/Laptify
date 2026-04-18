package fit.iuh.laptify_backend.order.service;

import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;

public interface OrderService {
    OrderResponse createOrder(OrderCreationRequest request);
    OrderResponse getOrderByTrackingCode(String trackingCode);
}
