package fit.iuh.laptify_backend.payment.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentInitiationRequest {
    /** Order to be paid. */
    private Long orderId;
    /** Gateway to use: VNPAY | MOMO | ZALOPAY. */
    private String method;
}