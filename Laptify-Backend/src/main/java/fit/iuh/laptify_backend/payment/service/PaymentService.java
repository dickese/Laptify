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
     * Verify and apply a gateway IPN (server-to-server notification — the source of truth).
     * Idempotent: an IPN for an already-confirmed payment is a no-op. On success the linked
     * order is advanced out of PENDING. Returns a granular {@link CallbackOutcome} so the caller
     * can build the gateway-specific acknowledgement.
     */
    CallbackOutcome processIpn(PaymentMethod method, Map<String, String> params);

    /**
     * Verify a gateway callback WITHOUT mutating any state. Use for browser return URLs, whose
     * only job is to show the customer a result — never to confirm the payment.
     */
    PaymentCallbackResult verifyCallback(PaymentMethod method, Map<String, String> params);
}