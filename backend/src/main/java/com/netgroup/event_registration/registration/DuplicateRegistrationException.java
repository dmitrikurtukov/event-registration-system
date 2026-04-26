package com.netgroup.event_registration.registration;

public class DuplicateRegistrationException extends RuntimeException {
    public DuplicateRegistrationException() {
        super("Participant is already registered for this event.");
    }
}
