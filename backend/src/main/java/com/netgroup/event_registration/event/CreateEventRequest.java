package com.netgroup.event_registration.event;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateEventRequest(
        @NotBlank(message = "Title is required.")
        @Size(max = 255, message = "Title cannot exceed 255 characters.")
        String title,

        @NotNull(message = "Event time is required.")
        @Future(message = "Event time must be in the future.")
        LocalDateTime eventTime,

        @NotNull(message = "Maximum participants count is required.")
        @Min(value = 1, message = "There must be at least 1 participant.")
        Integer maxParticipants
) {}
