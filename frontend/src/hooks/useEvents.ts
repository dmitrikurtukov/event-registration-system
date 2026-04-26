import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services/event-service";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: ({ signal }) => eventService.getEvents(signal),
    initialData: [],
  });
}
