package fit.iuh.laptify_backend.order.service.impl;

import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.service.AuthService;
import fit.iuh.laptify_backend.advice.exception.BadRequestException;
import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.order.entity.Order;
import fit.iuh.laptify_backend.order.entity.OrderDetail;
import fit.iuh.laptify_backend.order.entity.UserPlacementInfo;
import fit.iuh.laptify_backend.order.repository.OrderRepository;
import fit.iuh.laptify_backend.order.service.OrderService;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.SkuRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final SkuRepository skuRepository;
    private final OrderRepository orderRepository;
    private final AuthService authService;

    @Override
    public OrderResponse getOrderByTrackingCode(String trackingCode) {
        if(trackingCode == null || trackingCode.isBlank()){
            throw new BadRequestException("Tracking code must not be empty");
        }

        Order order  = orderRepository.findByTrackingCode(trackingCode)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with tracking code: " + trackingCode));

        return mapEntityToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderCreationRequest request) {
        UserPlacementInfo customerInfo = buildCustomerPlacement(request.getCustomer());

        Order order = new Order(customerInfo);

        List<OrderDetail> orderDetails = buildOrderDetails(request.getProducts(), order);

        BigDecimal totalPrice = calculateTotalPrice(orderDetails);
        order.setTotalPrice(totalPrice);
        order.setShippingFee(BigDecimal.valueOf(30000));
        order.setTrackingCode(generateTrackingCode());

        return mapEntityToResponse(orderRepository.saveAndFlush(order));
    }

    private BigDecimal calculateTotalPrice(List<OrderDetail> orderDetails){
        return orderDetails.stream()
                .map(detail -> detail.getSubTotal() == null ? BigDecimal.ZERO : detail.getSubTotal())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private UserPlacementInfo buildCustomerPlacement(OrderCreationRequest.CustomerInfo customer){
        UserPlacementInfo customerInfo = new UserPlacementInfo(
                customer.getName(),
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getAddress(),
                customer.isSaved()
        );
        User user = authService.getCurrentUser();

        if(user != null){
            customerInfo.setUser(user);
        }
        return customerInfo;
    }


    private List<OrderDetail> buildOrderDetails(List<OrderCreationRequest.ProductInfo> products, Order order){
        List<String> skuCodes = products.stream()
                .map(OrderCreationRequest.ProductInfo::getSkuCode)
                .sorted()
                .toList();

        if(skuCodes.isEmpty()){
            throw new IllegalArgumentException("Require product to checkout");
        }

        List<Sku> skus = skuRepository.findSkusWithProductByCode(skuCodes);

        if(skus.size() != skuCodes.size()){
            List<String> foundSkuCodes = skus.stream()
                    .map(Sku::getSkuCode)
                    .toList();
            List<String> missingCodes = new ArrayList<>(skuCodes);
            missingCodes.removeAll(foundSkuCodes);
            throw new IllegalArgumentException("SkuCode not found: " + missingCodes);
        }

        Map<String, Sku> skuMap = skus.stream()
                .collect(Collectors.toMap(Sku::getSkuCode, sku -> sku));

        List<OrderDetail> orderDetails = new ArrayList<>();

        for (OrderCreationRequest.ProductInfo prod : products){
            Sku sku = skuMap.get(prod.getSkuCode());
            if (sku != null) {
                orderDetails.add(new OrderDetail(
                        sku.getPrice(),
                        prod.getQuantity(),
                        order,
                        sku
                ));
            }
        }

        order.setOrderDetails(orderDetails);
        return orderDetails;
    }

    private OrderResponse mapEntityToResponse(Order order){
        OrderResponse.CustomerInfo customerInfo = new OrderResponse.CustomerInfo(
            order.getUserInfoPlacement().getCustomerName(),
            order.getUserInfoPlacement().getEmail(),
            order.getUserInfoPlacement().getPhoneNumber(),
            order.getUserInfoPlacement().getAddress()
        );

        List<OrderResponse.OrderDetailInfo> orderDetails = order.getOrderDetails().stream().map(detail -> new OrderResponse.OrderDetailInfo(
                detail.getSku().getProduct().getName(),
                detail.getSku().getColor(),
                detail.getQuantity(),
                detail.getPriceAtPurchase()
        )).toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderDate(),
                order.getTotalPrice(),
                order.getShippingFee(),
                order.getStatus().name(),
                order.getTrackingCode(),
                customerInfo,
                orderDetails
        );
    }


    private String generateTrackingCode(){
        UUID uuid = UUID.randomUUID();
        byte[] bytes = new byte[16];

        long msb = uuid.getMostSignificantBits();
        long lsb = uuid.getLeastSignificantBits();

        for (int i = 0; i < 8; i++)
            bytes[i] = (byte) (msb >>> (8 * (7 - i)));
        for (int i = 8; i < 16; i++)
            bytes[i] = (byte) (lsb >>> (8 * (7 - i)));

        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
