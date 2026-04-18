package fit.iuh.laptify_backend.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthResult {
    private AuthResponse authResponse;
    private String refreshToken;
}
