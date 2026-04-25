import { apiClient } from "./api-client";

export interface RegisterForEventRequest {
  firstName: string;
  lastName: string;
  personalCode: string;
}

export interface RegistrationResponse {
  id: number;
  eventId: number;
  firstName: string;
  lastName: string;
  personalCode: string;
  createdAd: string;
}

class RegistrationService {
  async registerForEvent(
    eventId: number,
    request: RegisterForEventRequest,
  ): Promise<RegistrationResponse> {
    const response = await apiClient.post<RegistrationResponse>(
      `/events/${eventId}/registrations`,
      request,
    );
    return response.data;
  }
}

export const registrationService = new RegistrationService();
