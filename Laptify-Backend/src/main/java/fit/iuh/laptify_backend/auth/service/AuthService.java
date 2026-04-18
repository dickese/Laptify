package fit.iuh.laptify_backend.auth.service;

import fit.iuh.laptify_backend.auth.dto.request.UserLoginRequest;
import fit.iuh.laptify_backend.auth.dto.request.UserRegisterRequest;
import fit.iuh.laptify_backend.auth.dto.response.AuthResponse;
import fit.iuh.laptify_backend.auth.dto.response.AuthResult;
import fit.iuh.laptify_backend.auth.entity.User;

public interface AuthService {
    void register(UserRegisterRequest request);
    AuthResult login(UserLoginRequest request);
    AuthResult refreshToken(String refreshToken);
    User getCurrentUser();
}
