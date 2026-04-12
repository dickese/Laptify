package fit.iuh.laptify_backend.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserLoginRequest {
    private String email;
    private String password;
}
