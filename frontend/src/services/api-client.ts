import axios from "axios";
import { tokenStorage } from "./token-storage";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const hadAuthorizationHeader = Boolean(
      error.config?.headers?.Authorization,
    );

    if ((status === 401 || status === 403) && hadAuthorizationHeader)
      tokenStorage.removeToken("expired");

    return Promise.reject(error);
  },
);
