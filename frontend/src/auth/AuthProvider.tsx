import { type PropsWithChildren, useMemo, useState } from "react";

import { authService } from "../services/auth-service";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      login: async (request) => {
        await authService.login(request);
        setIsLoggedIn(true);
      },
      logout: () => {
        authService.logout();
        setIsLoggedIn(false);
      },
    }),
    [isLoggedIn],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
