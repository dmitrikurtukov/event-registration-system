import { type PropsWithChildren, useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";
import { authService } from "../services/auth-service";
import { AUTH_TOKEN_REMOVED_EVENT } from "../services/token-storage";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());

  useEffect(() => {
    const handleTokenRemoved = (event: Event) => {
      const reason = (event as CustomEvent<{ reason?: string }>).detail?.reason;

      setIsLoggedIn(false);

      if (reason === "expired")
        toast.warn("Session expired. Please log in again.");
    };

    globalThis.addEventListener(AUTH_TOKEN_REMOVED_EVENT, handleTokenRemoved);

    return () => {
      globalThis.removeEventListener(
        AUTH_TOKEN_REMOVED_EVENT,
        handleTokenRemoved,
      );
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      login: async (request) => {
        await authService.login(request);
        setIsLoggedIn(true);
        toast.success("Successfully logged in as admin!");
      },
      logout: () => {
        authService.logout();
        setIsLoggedIn(false);
        toast.info("Logged out.");
      },
    }),
    [isLoggedIn],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
