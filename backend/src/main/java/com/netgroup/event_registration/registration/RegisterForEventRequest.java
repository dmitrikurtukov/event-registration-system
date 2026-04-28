package com.netgroup.event_registration.registration;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterForEventRequest(
        @NotBlank(message = "First name is required.")
        @Size(max = 100, message = "First name cannot exceed 100 characters.")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 100, message = "Last name cannot exceed 100 characters.")
        String lastName,

        @NotBlank(message = "Personal code is required.")
        @Pattern(regexp = "\\d{11}", message = "Personal code must contain exactly 11 digits.")
        String personalCode
) {}
