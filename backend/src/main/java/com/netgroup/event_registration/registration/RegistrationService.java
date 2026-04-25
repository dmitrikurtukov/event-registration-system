package com.netgroup.event_registration.registration;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netgroup.event_registration.event.Event;
import com.netgroup.event_registration.event.EventRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    
    @Transactional
    public RegistrationResponse registerForEvent(Long eventId, RegisterForEventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        
        boolean alreadyRegistered = registrationRepository.existsByEventIdAndPersonalCode(
                eventId, 
                request.personalCode()
        );

        if (alreadyRegistered) 
            throw new IllegalArgumentException("Participant is already registered for this event");

        long registeredCount = registrationRepository.countByEventId(eventId);

        if (registeredCount >= event.getMaxParticipants()) 
            throw new IllegalArgumentException("Event is fully booked");

        Registration registration = new Registration();
        registration.setEvent(event);
        registration.setFirstName(request.firstName());
        registration.setLastName(request.lastName());
        registration.setPersonalCode(request.personalCode());

        Registration savedRegistration = registrationRepository.save(registration);

        return toResponse(savedRegistration);
    }

    private RegistrationResponse toResponse(Registration registration) {
        return new RegistrationResponse(
                registration.getId(), 
                registration.getEvent().getId(),
                registration.getFirstName(), 
                registration.getLastName(), 
                registration.getPersonalCode(), 
                registration.getCreatedAt()
        );
    }
}
