package fit.iuh.laptify_backend.payment.strategy.impl;

import fit.iuh.laptify_backend.payment.config.PaymentProperties;
import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.strategy.PaymentStrategy;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentCallbackResult;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationCommand;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationResult;
import fit.iuh.laptify_backend.payment.util.PaymentSignatureUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.Instant;
import java.util.*;

/**
 * VNPay (vnp_*) gateway. Unlike MoMo/ZaloPay, VNPay does not require a server-to-server call:
 * we sort the parameters, sign them with HMAC-SHA512, and redirect the customer to the pay URL.
 * The signature scheme follows VNPay's official Java sample (pay.html / IPN).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class VnPayStrategy implements PaymentStrategy {

    private static final DateTimeFormatter VNP_DATE =
            DateTimeFormatter.ofPattern("yyyyMMddHHmmss").withZone(ZoneId.of("Asia/Ho_Chi_Minh"));
    private static final DateTimeFormatter VNP_DATE_PARSE =
            DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    private final PaymentProperties properties;

    @Override
    public PaymentMethod getMethod() {
        return PaymentMethod.VNPAY;
    }

    @Override
    public PaymentInitiationResult initiate(PaymentInitiationCommand command) {
        PaymentProperties.Vnpay cfg = properties.getVnpay();

        Map<String, String> params = new TreeMap<>();
        params.put("vnp_Version", cfg.getVersion());
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", cfg.getTmnCode());
        // VNPay amounts are in the smallest VND unit (x100), no decimals.
        params.put("vnp_Amount", command.amount().multiply(BigDecimal.valueOf(100)).toBigInteger().toString());
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", command.transactionRef());
        params.put("vnp_OrderInfo", command.orderInfo());
        params.put("vnp_OrderType", "other");
        params.put("vnp_Locale", "vn");
        params.put("vnp_ReturnUrl", cfg.getReturnUrl());
        params.put("vnp_IpAddr", command.clientIp() == null ? "127.0.0.1" : command.clientIp());
        params.put("vnp_CreateDate", VNP_DATE.format(Instant.now()));

        // Build hash data and query string over the sorted, URL-encoded params (TreeMap = sorted).
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (Iterator<Map.Entry<String, String>> it = params.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, String> entry = it.next();
            String value = entry.getValue();
            if (value == null || value.isEmpty()) {
                continue;
            }
            String encodedValue = URLEncoder.encode(value, StandardCharsets.US_ASCII);
            hashData.append(entry.getKey()).append('=').append(encodedValue);
            query.append(URLEncoder.encode(entry.getKey(), StandardCharsets.US_ASCII)).append('=').append(encodedValue);
            if (it.hasNext()) {
                hashData.append('&');
                query.append('&');
            }
        }

        String secureHash = PaymentSignatureUtil.hmacSHA512(cfg.getHashSecret(), hashData.toString());
        String paymentUrl = cfg.getPayUrl() + "?" + query + "&vnp_SecureHash=" + secureHash;

        return new PaymentInitiationResult(paymentUrl, command.transactionRef());
    }

    @Override
    public PaymentCallbackResult parseCallback(Map<String, String> params) {
        Map<String, String> fields = new TreeMap<>(params);
        String receivedHash = fields.remove("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");

        StringBuilder hashData = new StringBuilder();
        for (Iterator<Map.Entry<String, String>> it = fields.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, String> entry = it.next();
            String value = entry.getValue();
            if (value == null || value.isEmpty()) {
                continue;
            }
            hashData.append(entry.getKey()).append('=')
                    .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            if (it.hasNext()) {
                hashData.append('&');
            }
        }

        String expectedHash = PaymentSignatureUtil.hmacSHA512(properties.getVnpay().getHashSecret(), hashData.toString());
        boolean signatureValid = expectedHash.equalsIgnoreCase(receivedHash);
        if (!signatureValid) {
            log.warn("VNPay callback signature mismatch for txnRef={}", params.get("vnp_TxnRef"));
        }

        String responseCode = params.get("vnp_ResponseCode");
        boolean success = signatureValid && "00".equals(responseCode);

        BigDecimal amount = null;
        if (params.get("vnp_Amount") != null) {
            amount = new BigDecimal(params.get("vnp_Amount")).divide(BigDecimal.valueOf(100));
        }

        return new PaymentCallbackResult(
                params.get("vnp_TxnRef"),
                signatureValid,
                success,
                params.get("vnp_TransactionNo"),
                amount,
                "VNPay response code: " + responseCode,
                parsePayDate(params.get("vnp_PayDate"))
        );
    }

    /** vnp_PayDate có dạng yyyyMMddHHmmss theo giờ Việt Nam; trả null nếu thiếu/không hợp lệ. */
    private Instant parsePayDate(String payDate) {
        if (payDate == null || payDate.isBlank()) {
            return null;
        }
        try {
            return LocalDateTime.parse(payDate, VNP_DATE_PARSE)
                    .atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
                    .toInstant();
        } catch (RuntimeException e) {
            log.warn("Unparseable vnp_PayDate: {}", payDate);
            return null;
        }
    }
}