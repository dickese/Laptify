package fit.iuh.laptify_backend.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserSessionResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
}
