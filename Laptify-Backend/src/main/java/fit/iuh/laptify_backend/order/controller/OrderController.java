package fit.iuh.laptify_backend.order.controller;

import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<OrderResponse> getOrderByTrackingCode(@RequestParam(name = "tracking_code") String trackingCode){
        return ResponseEntity.ok(orderService.getOrderByTrackingCode(trackingCode));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreationRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(request));
    }


}
