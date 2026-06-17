package fit.iuh.laptify_backend.payment.strategy.impl;

import com.fasterxml.jackson.databind.JsonNode;
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
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * MoMo (AIO / captureWallet) gateway. Builds the create-payment request, signs it with
 * HMAC-SHA256 over the alphabetically-ordered field string, POSTs it to MoMo, and returns the
 * {@code payUrl} from the response. Callbacks (IPN) are verified against the same scheme.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class MomoStrategy implements PaymentStrategy {

    private final PaymentProperties properties;
    private final RestClient paymentRestClient;

    @Override
    public PaymentMethod getMethod() {
        return PaymentMethod.MOMO;
    }

    @Override
    public PaymentInitiationResult initiate(PaymentInitiationCommand command) {
        PaymentProperties.Momo cfg = properties.getMomo();

        String requestId = command.transactionRef();
        String orderId = command.transactionRef();
        String amount = command.amount().toBigInteger().toString();
        String extraData = "";

        // MoMo signs the fields in a fixed alphabetical order.
        String rawSignature = "accessKey=" + cfg.getAccessKey()
                + "&amount=" + amount
                + "&extraData=" + extraData
                + "&ipnUrl=" + cfg.getIpnUrl()
                + "&orderId=" + orderId
                + "&orderInfo=" + command.orderInfo()
                + "&partnerCode=" + cfg.getPartnerCode()
                + "&redirectUrl=" + cfg.getRedirectUrl()
                + "&requestId=" + requestId
                + "&requestType=" + cfg.getRequestType();
        String signature = PaymentSignatureUtil.hmacSHA256(cfg.getSecretKey(), rawSignature);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("partnerCode", cfg.getPartnerCode());
        body.put("requestId", requestId);
        body.put("amount", Long.parseLong(amount)); // MoMo expects a numeric amount in the JSON body
        body.put("orderId", orderId);
        body.put("orderInfo", command.orderInfo());
        body.put("redirectUrl", cfg.getRedirectUrl());
        body.put("ipnUrl", cfg.getIpnUrl());
        body.put("lang", "vi");
        body.put("extraData", extraData);
        body.put("requestType", cfg.getRequestType());
        body.put("signature", signature);

        JsonNode response;
        try {
            response = paymentRestClient.post()
                    .uri(cfg.getEndpoint())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);
        } catch (Exception e) {
            log.error("MoMo create-payment request failed for ref={}", command.transactionRef(), e);
            throw new BusinessException("Không thể khởi tạo thanh toán MoMo");
        }

        if (response == null || !response.path("resultCode").asText("").equals("0")) {
            String message = response == null ? "no response" : response.path("message").asText();
            log.error("MoMo create-payment rejected for ref={}: {}", command.transactionRef(), message);
            throw new BusinessException("MoMo từ chối khởi tạo thanh toán: " + message);
        }

        return new PaymentInitiationResult(response.path("payUrl").asText(), command.transactionRef());
    }

    @Override
    public PaymentCallbackResult parseCallback(Map<String, String> params) {
        PaymentProperties.Momo cfg = properties.getMomo();

        String rawSignature = "accessKey=" + cfg.getAccessKey()
                + "&amount=" + params.get("amount")
                + "&extraData=" + params.getOrDefault("extraData", "")
                + "&message=" + params.get("message")
                + "&orderId=" + params.get("orderId")
                + "&orderInfo=" + params.get("orderInfo")
                + "&orderType=" + params.get("orderType")
                + "&partnerCode=" + params.get("partnerCode")
                + "&payType=" + params.get("payType")
                + "&requestId=" + params.get("requestId")
                + "&responseTime=" + params.get("responseTime")
                + "&resultCode=" + params.get("resultCode")
                + "&transId=" + params.get("transId");
        String expectedSignature = PaymentSignatureUtil.hmacSHA256(cfg.getSecretKey(), rawSignature);

        boolean signatureValid = expectedSignature.equals(params.get("signature"));
        if (!signatureValid) {
            log.warn("MoMo callback signature mismatch for orderId={}", params.get("orderId"));
        }

        boolean success = signatureValid && "0".equals(params.get("resultCode"));
        BigDecimal amount = params.get("amount") != null ? new BigDecimal(params.get("amount")) : null;

        return new PaymentCallbackResult(
                params.get("orderId"),
                signatureValid,
                success,
                params.get("transId"),
                amount,
                params.get("message")
        );
    }
}
