import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  registrationService,
  type RegisterForEventRequest,
} from "../services/registration-service";

interface RegisterForEventVariables {
  eventId: number;
  request: RegisterForEventRequest;
}

export function useRegisterEventForm(
  eventId: number | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForEventRequest>();

  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: ({ eventId, request }: RegisterForEventVariables) =>
      registrationService.registerForEvent(eventId, request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Successfully registered!");
      closeDialog();
    },
  });

  const handleRegister = handleSubmit((data) => {
    if (eventId === null) return;

    registerMutation.mutate({ eventId, request: data });
  });

  const closeDialog = () => {
    reset();
    registerMutation.reset();
    onClose();
  };

  const handleClose = () => {
    if (registerMutation.isPending) return;

    closeDialog();
  };

  return {
    register,
    handleRegister,
    handleClose,
    error: registerMutation.error,
    errors,
    isPending: registerMutation.isPending,
  };
}
