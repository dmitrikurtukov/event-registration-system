package com.netgroup.event_registration.event;

import java.time.LocalDateTime;

public record EventResponse(
        Long id, 
        String title,
        LocalDateTime eventTime,
        Integer maxParticipants,
        Long registeredCount,
        Long availableSpots
) {}
