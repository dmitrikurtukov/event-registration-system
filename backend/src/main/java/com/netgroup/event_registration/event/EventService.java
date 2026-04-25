package com.netgroup.event_registration.event;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netgroup.event_registration.registration.RegistrationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    @Transactional(readOnly = true)
    public List<EventResponse> getEvents() {
        return eventRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public EventResponse createEvent(CreateEventRequest request) {
        Event event = new Event();
        event.setTitle(request.title());
        event.setEventTime(request.eventTime());
        event.setMaxParticipants(request.maxParticipants());

        Event savedEvent = eventRepository.save(event);
        
        return toResponse(savedEvent);
    }

    private EventResponse toResponse(Event event) {
        long registeredCount = registrationRepository.countByEventId(event.getId());
        long availableSpots = event.getMaxParticipants() - registeredCount;

        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getEventTime(),
                event.getMaxParticipants(),
                registeredCount,
                availableSpots
        );
    }
}
