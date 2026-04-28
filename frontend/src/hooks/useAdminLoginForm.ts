import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/useAuth";
import { loginSchema } from "../schemas/loginSchema";
import type { LoginRequest } from "../services/auth-service";

export function useAdminLoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const handleLogin = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    register,
    handleLogin,
    error: loginMutation.error,
    errors,
    isPending: loginMutation.isPending,
  };
}
