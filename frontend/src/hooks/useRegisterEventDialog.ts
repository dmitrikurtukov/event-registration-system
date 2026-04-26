import { useForm } from "react-hook-form";
import { useRegisterForEvent } from "./useRegisterForEvent";

interface FormData {
  firstName: string;
  lastName: string;
  personalCode: string;
}

export function useRegisterEventDialog(
  eventId: number | null,
  onClose: () => void,
) {
  const registerMutation = useRegisterForEvent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleClose = () => {
    if (registerMutation.isPending) return;

    reset();
    registerMutation.reset();
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    if (eventId === null) return;

    await registerMutation.mutateAsync({
      eventId,
      request: data,
    });

    handleClose();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleClose,
    isPending: registerMutation.isPending,
    error: registerMutation.error,
  };
}
