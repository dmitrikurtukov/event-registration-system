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
