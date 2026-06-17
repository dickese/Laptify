package fit.iuh.laptify_backend.payment.strategy;

import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentCallbackResult;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationCommand;
import fit.iuh.laptify_backend.payment.strategy.dto.PaymentInitiationResult;

import java.util.Map;

/**
 * Strategy for a single payment gateway. Each implementation is a Spring bean and is
 * discovered automatically by {@code PaymentStrategyRegistry} via {@link #getMethod()}.
 *
 * <p>To add a new gateway: implement this interface, annotate it {@code @Component}, and
 * return the matching {@link PaymentMethod}. No registration code needs to change.
 */
public interface PaymentStrategy {

    /** The gateway this strategy handles; used as the registry key. */
    PaymentMethod getMethod();

    /** Build a gateway payment request and return the redirect URL to send the customer to. */
    PaymentInitiationResult initiate(PaymentInitiationCommand command);

    /**
     * Verify and parse a callback/IPN sent by the gateway. Implementations MUST validate
     * the gateway signature and only report {@code success = true} when it is valid and the
     * gateway's own status code indicates a completed charge.
     *
     * @param params flattened callback parameters (query params or JSON body as strings)
     */
    PaymentCallbackResult parseCallback(Map<String, String> params);
}