package fit.iuh.laptify_backend.payment.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Gateway credentials and endpoints, bound from the {@code payment.*} block in application.yml.
 * Values default to the public sandbox endpoints; secrets come from environment variables.
 */
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "payment")
public class PaymentProperties {

    private Vnpay vnpay = new Vnpay();
    private Momo momo = new Momo();
    private Zalopay zalopay = new Zalopay();

    @Getter
    @Setter
    public static class Vnpay {
        private String tmnCode;
        private String hashSecret;
        private String payUrl;
        private String returnUrl;
        private String version = "2.1.0";
    }

    @Getter
    @Setter
    public static class Momo {
        private String partnerCode;
        private String accessKey;
        private String secretKey;
        private String endpoint;
        private String redirectUrl;
        private String ipnUrl;
        private String requestType = "captureWallet";
    }

    @Getter
    @Setter
    public static class Zalopay {
        private int appId;
        private String key1;
        private String key2;
        private String endpoint;
        private String callbackUrl;
        private String redirectUrl;
    }
}