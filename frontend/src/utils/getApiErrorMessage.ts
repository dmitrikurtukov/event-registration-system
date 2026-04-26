import { isAxiosError } from "axios";

interface ApiErrorResponse {
  messages?: string[];
  error?: string;
}

export default function getApiErrorMessage(
  error: unknown,
  fallback = "The server is unavailable or a network error occurred.",
): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.messages?.[0] ??
      error.response?.data?.error ??
      fallback
    );
  }

  return fallback;
}
