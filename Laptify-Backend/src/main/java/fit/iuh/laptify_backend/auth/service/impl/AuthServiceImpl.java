package fit.iuh.laptify_backend.auth.service.impl;

import fit.iuh.laptify_backend.auth.dto.request.UserLoginRequest;
import fit.iuh.laptify_backend.auth.dto.request.UserRegisterRequest;
import fit.iuh.laptify_backend.auth.dto.response.AuthResult;
import fit.iuh.laptify_backend.auth.entity.Role;
import fit.iuh.laptify_backend.auth.entity.RoleName;
import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.repository.RoleRepository;
import fit.iuh.laptify_backend.auth.repository.UserRepository;
import fit.iuh.laptify_backend.auth.service.AuthService;
import fit.iuh.laptify_backend.cart.entity.Cart;
import fit.iuh.laptify_backend.advice.exception.ResourceAlreadyExisted;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User getCurrentUser() {
        return null;
    }

    @Override
    public void register(UserRegisterRequest request) {
        if(userRepository.existsUserByEmail((request.getEmail()))){
            throw new ResourceAlreadyExisted("Email already existed");
        }

        String hashedPassword = bCryptPasswordEncoder.encode(request.getPassword());

        User user = new User(request.getEmail(), request.getName(), hashedPassword);
        Role role = roleRepository.findByName(RoleName.USER);

        if(role == null){
            throw new EntityNotFoundException("Role " + RoleName.USER + " not found");
        }

        Cart cart = new Cart();

        user.setRole(role);
        user.setCart(cart);

        userRepository.save(user);
    }


    @Override
    public AuthResult login(UserLoginRequest request) {
        return null;
    }

    @Override
    public AuthResult refreshToken(String refreshToken) {
        return null;
    }

}
