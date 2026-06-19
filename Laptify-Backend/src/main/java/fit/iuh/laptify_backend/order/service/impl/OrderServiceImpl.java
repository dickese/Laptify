package fit.iuh.laptify_backend.order.service.impl;

import fit.iuh.laptify_backend.advice.exception.UnauthorizedException;
import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.repository.UserRepository;
import fit.iuh.laptify_backend.auth.service.AuthService;
import fit.iuh.laptify_backend.advice.exception.BadRequestException;
import fit.iuh.laptify_backend.cart.entity.Cart;
import fit.iuh.laptify_backend.cart.repository.CartRepository;
import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.request.OrderFilter;
import fit.iuh.laptify_backend.order.dto.request.OrderStatusUpdatingRequest;
import fit.iuh.laptify_backend.order.dto.request.OrderUpdatingRequest;
import fit.iuh.laptify_backend.order.dto.response.CustomerOrderInfoResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.order.entity.Order;
import fit.iuh.laptify_backend.order.entity.OrderDetail;
import fit.iuh.laptify_backend.order.entity.OrderPaymentMethod;
import fit.iuh.laptify_backend.order.entity.OrderStatus;
import fit.iuh.laptify_backend.order.entity.UserPlacementInfo;
import fit.iuh.laptify_backend.order.repository.OrderRepository;
import fit.iuh.laptify_backend.order.repository.OrderSpecification;
import fit.iuh.laptify_backend.order.repository.UserPlacementRepository;
import fit.iuh.laptify_backend.order.service.OrderService;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.SkuRepository;
import fit.iuh.laptify_backend.product.service.InventoryService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
    private final SkuRepository skuRepository;
    private final OrderRepository orderRepository;
    private final AuthService authService;
    private final CartRepository cartRepository;
    private final UserPlacementRepository userPlacementRepository;
    private final UserRepository userRepository;
    private final InventoryService inventoryService;

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
    public OrderResponse getOrderById(Long orderId) {
        Order order =  orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        return mapEntityToResponse(order);
    }

    @Override
    public PageResponse<List<OrderDisplayResponse>> getOrders(PageRequest page) {
        Pageable pageable = toPageable(page);

        var pageResult = orderRepository.findAllOrdersWithPagination(pageable);

        return PageResponse.<List<OrderDisplayResponse>>builder()
                .page(pageResult.getNumber())
                .size(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .hasNext(pageResult.hasNext())
                .data(pageResult.getContent())
                .build();
    }


    @Override
    public PageResponse<List<OrderDisplayResponse>> getOrdersByUserId(PageRequest page, Long userId) {
        Pageable pageable = toPageable(page);

        Page<OrderDisplayResponse> pageResult = orderRepository.findAllOrdersWithPaginationByUserId(pageable, userId);
        return PageResponse.<List<OrderDisplayResponse>>builder()
                .page(pageResult.getNumber())
                .size(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .hasNext(pageResult.hasNext())
                .data(pageResult.getContent())
                .build();
    }

    @Override
    public PageResponse<List<OrderDisplayResponse>> searchOrderByFilter(Pageable page, OrderFilter orderFilter) {
        validateOrderFilter(orderFilter);

        var pageResult = orderRepository.findAll(OrderSpecification.getSpecification(orderFilter), page);

        List<OrderDisplayResponse> responses = pageResult.getContent().stream()
                .map(this::mapEntityToOrderDisplayResponse)
                .toList();

        return PageResponse.<List<OrderDisplayResponse>>builder()
                .page(pageResult.getNumber())
                .size(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .hasNext(pageResult.hasNext())
                .data(responses)
                .build();
    }

    private void validateOrderFilter(OrderFilter orderFilter) {
        if (orderFilter.getOrderId() != null && !orderFilter.getOrderId().isEmpty()) {
            try {
                Long.parseLong(orderFilter.getOrderId());
            } catch (NumberFormatException e) {
                throw new BadRequestException("Invalid order ID: must be a valid number");
            }
        }

        if (orderFilter.getStatus() != null && !orderFilter.getStatus().isEmpty()) {
            try {
                OrderStatus.valueOf(orderFilter.getStatus().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid order status: " + orderFilter.getStatus());
            }
        }
    }

    private org.springframework.data.domain.PageRequest toPageable(PageRequest pageRequest) {
        return org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), Sort.unsorted());
    }

    @Override
    public CustomerOrderInfoResponse getLatestCustomerPlacementInfo(Long userId) {
        CustomerOrderInfoResponse res =  userPlacementRepository.getLatestSavedCustomerPlacementInfo(userId)
                .orElse((null));

        if(res == null){
            User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
            return CustomerOrderInfoResponse.builder()
                    .customerName(user.getName())
                    .email(user.getEmail())
                .build();
        }

        return res;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderCreationRequest request) {
        UserPlacementInfo customerInfo = buildCustomerPlacement(request.getCustomer());

        OrderPaymentMethod paymentMethod = parsePaymentMethod(request.getPaymentMethod());

        Long newOrderId = System.currentTimeMillis();
        // COD -> PENDING_CONFIRMATION, online -> PENDING_PAYMENT (xem Order constructor).
        Order order = new Order(newOrderId, customerInfo, paymentMethod);

        List<OrderDetail> orderDetails = buildOrderDetails(request.getProducts(), order);

        // Giữ kho NGAY tại bước tạo đơn (cả COD lẫn online) bằng trừ kho nguyên tử: chỉ một người
        // thắng được tồn kho và đi tiếp vào quy trình thanh toán; người đến sau bị từ chối "hết hàng".
        List<InventoryService.StockChange> reservations = orderDetails.stream()
                .map(detail -> new InventoryService.StockChange(detail.getSku().getSkuCode(), detail.getQuantity()))
                .toList();
        inventoryService.tryReserve(reservations).ifPresent(soldOutSku -> {
            throw new BadRequestException("Sản phẩm đã hết hàng: " + soldOutSku);
        });

        BigDecimal totalPrice = calculateTotalPrice(orderDetails);
        order.setTotalPrice(totalPrice);
        order.setShippingFee(BigDecimal.valueOf(30000));
        order.setTrackingCode(generateTrackingCode());

        removeCartItemAfterOrder(request.getProducts());

        return mapEntityToResponse(orderRepository.saveAndFlush(order));
    }

    @Override
    public OrderResponse updateOrder(OrderUpdatingRequest request, Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        order.getUserInfoPlacement().setCustomerName(request.getCustomerName());
        order.getUserInfoPlacement().setAddress(request.getAddress());
        order.getUserInfoPlacement().setPhoneNumber(request.getPhoneNumber());

        return mapEntityToResponse(orderRepository.saveAndFlush(order));
    }

    private OrderStatus validateOrderStatus(String status){
        log.info(status);
        if (status == null) {
            return null;
        }
        try {
            return OrderStatus.valueOf(status.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    /** Phương thức thanh toán khách chọn; rỗng/null coi như COD để giữ tương thích ngược. */
    private OrderPaymentMethod parsePaymentMethod(String method) {
        if (method == null || method.isBlank()) {
            return OrderPaymentMethod.COD;
        }
        try {
            return OrderPaymentMethod.valueOf(method.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Unsupported payment method: " + method);
        }
    }

    @Override
    public OrderResponse updateOrderStatus(OrderStatusUpdatingRequest orderStatus, Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));


        OrderStatus newStatus = validateOrderStatus(orderStatus.getStatus());

        if(newStatus == null){
            throw new BadRequestException("Invalid order status");
        }

        order.setStatus(newStatus);
        return mapEntityToResponse(orderRepository.saveAndFlush(order));
    }

    @Override
    public Long deleteOrderById(Long orderId) {
        orderRepository.deleteById(orderId);
        return orderId;
    }

    private void removeCartItemAfterOrder(List<OrderCreationRequest.ProductInfo> productInfos){
        try {
            User currentuser = authService.getCurrentUser();
            Cart cart = cartRepository.getCartByUser_Id(currentuser.getId());

            for(OrderCreationRequest.ProductInfo pi : productInfos){
                cart.getCartDetails().removeIf(cd -> cd.getSku().getSkuCode().equalsIgnoreCase(pi.getSkuCode()));
            }
        }catch (UnauthorizedException ignored){
            log.info("User: unknown");
        }
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
        try {
            User user = authService.getCurrentUser();
            customerInfo.setUser(user);
        }catch (UnauthorizedException ignored){

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

        List<OrderResponse.OrderDetailInfo> orderDetails = order.getOrderDetails().stream().map(detail ->
                new OrderResponse.OrderDetailInfo(
                detail.getId(),
                detail.getSku().getProduct().getName(),
                detail.getSku().getColor(),
                detail.getQuantity(),
                detail.getPriceAtPurchase(),
                detail.getSubTotal(),
                detail.getSku().getMediaMetadata().getFirst().getUrl()
        )).toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderDate(),
                order.getTotalPrice(),
                order.getShippingFee(),
                order.getTotalDue(),
                order.getStatus().name(),
                order.getPaymentMethod() == null ? null : order.getPaymentMethod().name(),
                order.isPaid(),
                order.getTrackingCode(),
                customerInfo,
                orderDetails
        );
    }

    private OrderDisplayResponse mapEntityToOrderDisplayResponse(Order order) {
        return new OrderDisplayResponse(
                order.getId(),
                order.getUserInfoPlacement().getCustomerName(),
                order.getUserInfoPlacement().getPhoneNumber(),
                order.getOrderDate().atZone(java.time.ZoneOffset.UTC).toLocalDateTime(),
                order.getTotalPrice(),
                order.getStatus().name()
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
