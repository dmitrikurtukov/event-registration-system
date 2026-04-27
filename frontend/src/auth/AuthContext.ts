import { createContext } from "react";

import type { LoginRequest } from "../services/auth-service";

export interface AuthContextValue {
  isLoggedIn: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
