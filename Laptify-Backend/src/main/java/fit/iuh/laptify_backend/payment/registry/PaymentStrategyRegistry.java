package fit.iuh.laptify_backend.payment.registry;

import fit.iuh.laptify_backend.advice.exception.BadRequestException;
import fit.iuh.laptify_backend.payment.entity.PaymentMethod;
import fit.iuh.laptify_backend.payment.strategy.PaymentStrategy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Registry of payment strategies.
 *
 * <p>Spring injects every {@link PaymentStrategy} bean on the classpath; the registry indexes
 * them by their {@link PaymentMethod}. This keeps strategy selection open for extension and
 * closed for modification — adding a gateway is just adding a new {@code @Component} strategy,
 * with no change here or in the service.
 */
@Component
@Slf4j
public class PaymentStrategyRegistry {

    private final Map<PaymentMethod, PaymentStrategy> strategies;

    public PaymentStrategyRegistry(List<PaymentStrategy> availableStrategies) {
        this.strategies = availableStrategies.stream()
                .collect(Collectors.toUnmodifiableMap(PaymentStrategy::getMethod, Function.identity()));
        log.info("Registered payment strategies: {}", strategies.keySet());
    }

    /**
     * @throws BadRequestException if no strategy is registered for the method
     */
    public PaymentStrategy resolve(PaymentMethod method) {
        PaymentStrategy strategy = strategies.get(method);
        if (strategy == null) {
            throw new BadRequestException("Unsupported payment method: " + method);
        }
        return strategy;
    }

    /** Methods currently backed by a registered strategy. */
    public Set<PaymentMethod> supportedMethods() {
        return strategies.keySet();
    }
}