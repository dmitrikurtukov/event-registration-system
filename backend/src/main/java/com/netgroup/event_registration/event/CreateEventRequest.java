package com.netgroup.event_registration.event;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateEventRequest(
        @NotBlank
        @Size(max = 255)
        String title,

        @NotNull
        @Future
        LocalDateTime eventTime,

        @NotNull
        @Min(1)
        Integer maxParticipants
) {}
