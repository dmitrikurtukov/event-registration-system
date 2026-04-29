package com.netgroup.event_registration.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock
    private AdminProperties adminProperties;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    void loginReturnsJwtWhenAdminCredentialsAreValid() {
        LoginRequest request = new LoginRequest("admin@example.com", "password");

        when(adminProperties.email()).thenReturn("admin@example.com");
        when(adminProperties.password()).thenReturn("password");
        when(jwtService.generateToken("admin@example.com")).thenReturn("jwt-token");

        LoginResponse response = authService.login(request);

        assertThat(response.token()).isEqualTo("jwt-token");
        verify(jwtService).generateToken("admin@example.com");
    }

    @Test
    void loginThrowsWhenCredentialsAreInvalid() {
        LoginRequest request = new LoginRequest("admin@example.com", "wrong-password");

        when(adminProperties.email()).thenReturn("admin@example.com");
        when(adminProperties.password()).thenReturn("password");

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Invalid email or password.");

        verifyNoInteractions(jwtService);
    }
}
