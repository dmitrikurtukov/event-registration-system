import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createEventSchema } from "../schemas/createEventSchema";
import {
  eventService,
  type CreateEventRequest,
} from "../services/event-service";
import { formatDateTimeLocalInputValue } from "../utils/dateTimeFormatters";

export function useCreateEventForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventRequest>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventTime: formatDateTimeLocalInputValue(new Date()),
    },
  });

  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: (event: CreateEventRequest) => eventService.createEvent(event),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      reset();
      toast.success("Event created successfuly!");
    },
  });

  const handleCreateEvent = handleSubmit((data) => {
    createEventMutation.mutate(data);
  });

  return {
    register,
    handleCreateEvent,
    error: createEventMutation.error,
    errors,
    isPending: createEventMutation.isPending,
  };
}
