import { apiClient } from "./api-client";
import { tokenStorage } from "./token-storage";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

class AuthService {
  private readonly endpoint = "/auth";

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      `${this.endpoint}/login`,
      request,
    );

    tokenStorage.setToken(response.data.token);

    return response.data;
  }

  logout(): void {
    tokenStorage.removeToken();
  }

  isLoggedIn(): boolean {
    return tokenStorage.hasToken();
  }
}

export const authService = new AuthService();
