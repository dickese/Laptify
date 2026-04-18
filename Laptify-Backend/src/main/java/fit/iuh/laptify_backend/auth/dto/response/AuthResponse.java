package fit.iuh.laptify_backend.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonPropertyOrder({"user", "accessToken"})
public class AuthResponse {
    @JsonProperty("user")
    private UserSessionResponse user;
    private String accessToken;
}
