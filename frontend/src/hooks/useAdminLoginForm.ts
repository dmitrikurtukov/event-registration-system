import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useAuth } from "../auth/useAuth";
import type { LoginRequest } from "../services/auth-service";

export function useAdminLoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
}
