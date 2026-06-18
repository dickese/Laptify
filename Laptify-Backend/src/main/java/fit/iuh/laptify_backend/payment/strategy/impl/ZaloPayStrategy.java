package fit.iuh.laptify_backend.payment.strategy.impl;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import fit.iuh.laptify_backend.advice.exception.BusinessException;
import fit.iuh.laptify_backend.payment.config.PaymentProperties;
import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.strategy.PaymentStrategy;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentCallbackResult;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationCommand;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationResult;
import fit.iuh.laptify_backend.payment.util.PaymentSignatureUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.Instant;
import java.util.Map;

/**
 * ZaloPay (v2 create) gateway. ZaloPay requires {@code app_trans_id} in the form
 * {@code yyMMdd_<ref>}; we keep that full id as the canonical transaction ref so the callback
 * (which echoes app_trans_id) maps straight back to the payment. The mac is HMAC-SHA256 of
 * {@code app_id|app_trans_id|app_user|amount|app_time|embed_data|item} keyed with key1; the
 * callback mac is keyed with key2.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ZaloPayStrategy implements PaymentStrategy {

    private static final DateTimeFormatter APP_TRANS_DATE =
            DateTimeFormatter.ofPattern("yyMMdd").withZone(ZoneId.of("Asia/Ho_Chi_Minh"));

    private final PaymentProperties properties;
    private final RestClient paymentRestClient;
    private final ObjectMapper objectMapper;

    @Override
    public PaymentMethod getMethod() {
        return PaymentMethod.ZALOPAY;
    }

    @Override
    public PaymentInitiationResult initiate(PaymentInitiationCommand command) {
        PaymentProperties.Zalopay cfg = properties.getZalopay();

        Instant now = Instant.now();
        // ZaloPay requires app_trans_id to be prefixed with the creation date and unique per day.
        String appTransId = APP_TRANS_DATE.format(now) + "_" + command.transactionRef();
        long appTime = now.toEpochMilli();
        String amount = command.amount().toBigInteger().toString();
        String appUser = "order_" + command.orderId();
        String item = "[]";
        String embedData = writeJson(Map.of("redirecturl", cfg.getRedirectUrl()));

        String macData = cfg.getAppId() + "|" + appTransId + "|" + appUser + "|" + amount
                + "|" + appTime + "|" + embedData + "|" + item;
        String mac = PaymentSignatureUtil.hmacSHA256(cfg.getKey1(), macData);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("app_id", String.valueOf(cfg.getAppId()));
        form.add("app_trans_id", appTransId);
        form.add("app_user", appUser);
        form.add("app_time", String.valueOf(appTime));
        form.add("amount", amount);
        form.add("item", item);
        form.add("embed_data", embedData);
        form.add("description", command.orderInfo());
        form.add("bank_code", "");
        form.add("callback_url", cfg.getCallbackUrl());
        form.add("mac", mac);

        JsonNode response;
        try {
            response = paymentRestClient.post()
                    .uri(cfg.getEndpoint())
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(form)
                    .retrieve()
                    .body(JsonNode.class);
        } catch (Exception e) {
            log.error("ZaloPay create-order request failed for ref={}", command.transactionRef(), e);
            throw new BusinessException("Không thể khởi tạo thanh toán ZaloPay");
        }

        if (response == null || response.path("return_code").asInt(0) != 1) {
            String message = response == null ? "no response" : response.path("return_message").asText();
            log.error("ZaloPay create-order rejected for ref={}: {}", command.transactionRef(), message);
            throw new BusinessException("ZaloPay từ chối khởi tạo thanh toán: " + message);
        }

        // Persist the full app_trans_id as our ref so the callback maps back to this payment.
        return new PaymentInitiationResult(response.path("order_url").asText(), appTransId);
    }

    @Override
    public PaymentCallbackResult parseCallback(Map<String, String> params) {
        PaymentProperties.Zalopay cfg = properties.getZalopay();

        String data = params.get("data");
        String receivedMac = params.get("mac");
        String expectedMac = data == null ? "" : PaymentSignatureUtil.hmacSHA256(cfg.getKey2(), data);

        boolean signatureValid = expectedMac.equals(receivedMac);
        if (!signatureValid) {
            log.warn("ZaloPay callback mac mismatch");
            return new PaymentCallbackResult(null, false, false, null, null, "Invalid mac", null);
        }

        // ZaloPay only invokes the callback on a successful charge; mac validity == success.
        try {
            JsonNode payload = objectMapper.readTree(data);
            BigDecimal amount = payload.has("amount") ? new BigDecimal(payload.get("amount").asText()) : null;
            // server_time là epoch millis thời điểm ZaloPay xử lý giao dịch.
            Instant paidAt = payload.has("server_time")
                    ? Instant.ofEpochMilli(payload.get("server_time").asLong())
                    : null;
            return new PaymentCallbackResult(
                    payload.path("app_trans_id").asText(),
                    true,
                    true,
                    payload.path("zp_trans_id").asText(),
                    amount,
                    "ZaloPay payment success",
                    paidAt
            );
        } catch (Exception e) {
            log.error("Failed to parse ZaloPay callback data", e);
            return new PaymentCallbackResult(null, true, false, null, null, "Malformed callback data", null);
        }
    }

    private String writeJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception e) {
            throw new BusinessException("Không thể tạo dữ liệu thanh toán ZaloPay");
        }
    }
}
