package fit.iuh.laptify_backend.payment.config;

import tools.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

/**
 * Shared HTTP client used by the gateway strategies (MoMo and ZaloPay make server-to-server
 * create-order calls; VNPay only builds a redirect URL and does not use this).
 */
@Configuration
public class PaymentHttpConfig {

    @Bean
    public RestClient paymentRestClient() {
        return RestClient.create();
    }

    @Bean
    public ObjectMapper objectMapper(){
        return new ObjectMapper();
    }
}