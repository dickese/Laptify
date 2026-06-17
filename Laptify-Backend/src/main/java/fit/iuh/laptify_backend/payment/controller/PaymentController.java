package fit.iuh.laptify_backend.payment.controller;

import fit.iuh.laptify_backend.payment.dto.request.PaymentInitiationRequest;
import fit.iuh.laptify_backend.payment.dto.response.PaymentInitiationResponse;
import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.service.CallbackOutcome;
import fit.iuh.laptify_backend.payment.service.PaymentService;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentCallbackResult;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    /** Start a payment for an order; the client redirects the browser to the returned paymentUrl. */
    @PostMapping
    public ResponseEntity<PaymentInitiationResponse> initiate(
            @RequestBody PaymentInitiationRequest request,
            HttpServletRequest httpRequest
    ) {
        return ResponseEntity.ok(paymentService.initiatePayment(request, resolveClientIp(httpRequest)));
    }

    // ----- VNPay: separate return (browser) vs IPN (server-to-server) -----

    /**
     * VNPay return URL — the browser is redirected here after paying. READ-ONLY: it only
     * verifies the signature and reports the result for display. It must NOT confirm the
     * payment; confirmation happens on the IPN below. (Ideally this points at a frontend page.)
     */
    @GetMapping("/vnpay/callback")
    public ResponseEntity<Map<String, Object>> vnpayReturn(@RequestParam Map<String, String> params) {
        PaymentCallbackResult result = paymentService.verifyCallback(PaymentMethod.VNPAY, params);
        return ResponseEntity.ok(Map.of(
                "success", result.success(),
                "transactionRef", String.valueOf(result.transactionRef()),
                "message", String.valueOf(result.message())
        ));
    }

    /**
     * VNPay IPN — server-to-server notification and the source of truth for payment status.
     * Register this URL in the VNPay merchant portal. Returns VNPay's required ack body
     * ({@code {"RspCode","Message"}}); a non-00 code makes VNPay retry later.
     */
    @GetMapping("/vnpay/ipn")
    public ResponseEntity<Map<String, String>> vnpayIpn(@RequestParam Map<String, String> params) {
        CallbackOutcome outcome = paymentService.processIpn(PaymentMethod.VNPAY, params);
        return ResponseEntity.ok(toVnpayAck(outcome));
    }

    // ----- MoMo & ZaloPay: callback IS the IPN (server-to-server) -----

    /** MoMo IPN (server-to-server JSON). MoMo expects a 204 acknowledgement. */
    @PostMapping("/momo/callback")
    public ResponseEntity<Void> momoCallback(@RequestBody Map<String, Object> body) {
        paymentService.processIpn(PaymentMethod.MOMO, stringify(body));
        return ResponseEntity.noContent().build();
    }

    /** ZaloPay callback (server-to-server JSON {data, mac}). ZaloPay expects a return_code body. */
    @PostMapping("/zalopay/callback")
    public ResponseEntity<Map<String, Object>> zalopayCallback(@RequestBody Map<String, Object> body) {
        CallbackOutcome outcome = paymentService.processIpn(PaymentMethod.ZALOPAY, stringify(body));
        boolean acknowledged = outcome == CallbackOutcome.CONFIRMED || outcome == CallbackOutcome.ALREADY_CONFIRMED;
        return ResponseEntity.ok(Map.of(
                "return_code", acknowledged ? 1 : -1,
                "return_message", acknowledged ? "success" : "failed"
        ));
    }

    /** Map a generic outcome to VNPay's documented IPN response codes. */
    private Map<String, String> toVnpayAck(CallbackOutcome outcome) {
        return switch (outcome) {
            case CONFIRMED, PAYMENT_FAILED -> ackOf("00", "Confirm Success");
            case ALREADY_CONFIRMED -> ackOf("02", "Order already confirmed");
            case AMOUNT_MISMATCH -> ackOf("04", "Invalid amount");
            case INVALID_SIGNATURE -> ackOf("97", "Invalid Checksum");
            case ORDER_NOT_FOUND -> ackOf("01", "Order not Found");
        };
    }

    private Map<String, String> ackOf(String code, String message) {
        return Map.of("RspCode", code, "Message", message);
    }

    private Map<String, String> stringify(Map<String, Object> body) {
        Map<String, String> params = new HashMap<>();
        body.forEach((key, value) -> params.put(key, value == null ? null : String.valueOf(value)));
        return params;
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}