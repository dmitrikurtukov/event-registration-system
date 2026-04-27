package com.netgroup.event_registration.auth;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AdminProperties adminProperties;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        if (!isAdminCredentialsValid(request)) 
            throw new BadCredentialsException("Invalid email or password.");

        String token = jwtService.generateToken(request.email());

        return new LoginResponse(token);
    }

    private boolean isAdminCredentialsValid(LoginRequest request) {
        return adminProperties.email().equals(request.email()) 
                && adminProperties.password().equals(request.password());
    }
}
