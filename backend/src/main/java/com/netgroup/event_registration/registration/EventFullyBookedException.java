package com.netgroup.event_registration.registration;

public class EventFullyBookedException extends RuntimeException {
    public EventFullyBookedException() {
        super("Event is fully booked.");
    }
}
