package com.netgroup.event_registration.event;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.netgroup.event_registration.registration.RegistrationRepository;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {
    @Mock
    private EventRepository eventRepository;

    @Mock
    private RegistrationRepository registrationRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    void getEventsReturnsEventResponsesWithAvailableSpots() {
        Event event = new Event();
        event.setId(1L);
        event.setTitle("Summer School");
        event.setEventTime(LocalDateTime.of(2026, 7, 10, 18, 0));
        event.setMaxParticipants(20);

        when(eventRepository.findAll()).thenReturn(List.of(event));
        when(registrationRepository.countByEventId(1L)).thenReturn(7L);

        List<EventResponse> events = eventService.getEvents();

        assertThat(events).containsExactly(new EventResponse(
                1L,
                "Summer School",
                LocalDateTime.of(2026, 7, 10, 18, 0),
                20,
                7L,
                13L
        ));
    }

    @Test
    void createEventSavesEventAndReturnsResponse() {
        LocalDateTime eventTime = LocalDateTime.of(2026, 7, 10, 18, 0);
        CreateEventRequest request = new CreateEventRequest("Summer School", eventTime, 20);

        when(eventRepository.save(any(Event.class))).thenAnswer(invocation -> {
            Event savedEvent = invocation.getArgument(0);
            savedEvent.setId(1L);
            return savedEvent;
        });
        when(registrationRepository.countByEventId(1L)).thenReturn(0L);

        EventResponse response = eventService.createEvent(request);

        ArgumentCaptor<Event> eventCaptor = ArgumentCaptor.forClass(Event.class);
        verify(eventRepository).save(eventCaptor.capture());

        Event savedEvent = eventCaptor.getValue();
        assertThat(savedEvent.getTitle()).isEqualTo("Summer School");
        assertThat(savedEvent.getEventTime()).isEqualTo(eventTime);
        assertThat(savedEvent.getMaxParticipants()).isEqualTo(20);

        assertThat(response).isEqualTo(new EventResponse(
                1L,
                "Summer School",
                eventTime,
                20,
                0L,
                20L
        ));
    }
}
