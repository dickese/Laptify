package fit.iuh.laptify_backend.auth.service.impl;

import fit.iuh.laptify_backend.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        fit.iuh.laptify_backend.auth.entity.User user = userRepository.findByEmail((userName))
                .orElseThrow(() -> new UsernameNotFoundException("User with email: " + userName + " not found"));

        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().getName().name())
                .build();
    }
}
