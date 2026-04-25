package com.netgroup.event_registration.registration;

import java.time.LocalDateTime;

public record RegistrationResponse(
        Long id,
        Long eventId,
        String firstName,
        String lastName,
        String personalCode,
        LocalDateTime createdAt
) {}
