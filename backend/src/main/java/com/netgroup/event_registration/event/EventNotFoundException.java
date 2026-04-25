package com.netgroup.event_registration.event;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(Long eventId) {
        super("Event with id " + eventId + " was not found");
    }
}
