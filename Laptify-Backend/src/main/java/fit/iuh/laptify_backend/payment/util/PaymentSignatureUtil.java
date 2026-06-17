package fit.iuh.laptify_backend.payment.util;

import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;

/**
 * HMAC helpers shared by the gateway strategies. All gateways here sign their requests with
 * an HMAC keyed hash and expect a lowercase hex digest.
 */
public final class PaymentSignatureUtil {

    private PaymentSignatureUtil() {
    }

    public static String hmacSHA256(String key, String data) {
        return new HmacUtils(HmacAlgorithms.HMAC_SHA_256, key).hmacHex(data);
    }

    public static String hmacSHA512(String key, String data) {
        return new HmacUtils(HmacAlgorithms.HMAC_SHA_512, key).hmacHex(data);
    }
}