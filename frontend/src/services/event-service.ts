import { apiClient } from "./api-client";

export interface CreateEventRequest {
  title: string;
  eventTime: string;
  maxParticipants: number;
}

export interface EventResponse {
  id: number;
  title: string;
  eventTime: string;
  maxParticipants: number;
  registeredCount: number;
  availableSpots: number;
}

class EventService {
  private readonly endpoint = "/events";

  async getEvents(signal?: AbortSignal): Promise<EventResponse[]> {
    const response = await apiClient.get<EventResponse[]>(this.endpoint, {
      signal,
    });
    return response.data;
  }

  async createEvent(request: CreateEventRequest): Promise<EventResponse> {
    const response = await apiClient.post<EventResponse>(
      this.endpoint,
      request,
    );
    return response.data;
  }
}

export const eventService = new EventService();
