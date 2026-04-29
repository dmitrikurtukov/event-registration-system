const TOKEN_KEY = "event-registration-token";
export const AUTH_TOKEN_REMOVED_EVENT = "auth-token-removed";

type TokenRemovalReason = "manual" | "expired";

class TokenStorage {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(reason: TokenRemovalReason = "manual"): void {
    const hadToken = this.hasToken();

    localStorage.removeItem(TOKEN_KEY);

    if (hadToken) {
      globalThis.dispatchEvent(
        new CustomEvent(AUTH_TOKEN_REMOVED_EVENT, {
          detail: { reason },
        }),
      );
    }
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }
}

export const tokenStorage = new TokenStorage();
