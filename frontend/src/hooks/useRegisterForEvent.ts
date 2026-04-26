import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  registrationService,
  type RegisterForEventRequest,
} from "../services/registration-service";

interface RegisterForEventVariables {
  eventId: number;
  request: RegisterForEventRequest;
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, request }: RegisterForEventVariables) =>
      registrationService.registerForEvent(eventId, request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Successfully registered!");
    },
  });
}
