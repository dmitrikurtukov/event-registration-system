import { apiClient } from "./api-client";

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
    const response = apiClient.post<LoginResponse>(
      `${this.endpoint}/login`,
      request,
    );
    return (await response).data;
  }
}

export const authService = new AuthService();
