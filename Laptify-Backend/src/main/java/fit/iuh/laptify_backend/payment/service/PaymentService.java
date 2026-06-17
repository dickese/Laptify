package fit.iuh.laptify_backend.payment.service;

import fit.iuh.laptify_backend.payment.dto.request.PaymentInitiationRequest;
import fit.iuh.laptify_backend.payment.dto.response.PaymentInitiationResponse;
import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentCallbackResult;

import java.util.Map;

public interface PaymentService {

    /** Create a payment attempt for an order and return the gateway redirect URL. */
    PaymentInitiationResponse initiatePayment(PaymentInitiationRequest request, String clientIp);

    /**
     * Verify and apply a gateway callback/IPN. Idempotent: a callback for an already-confirmed
     * payment is ignored. On success, the linked order is advanced out of PENDING.
     */
    PaymentCallbackResult handleCallback(PaymentMethod method, Map<String, String> params);
}