package com.netgroup.event_registration.registration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.netgroup.event_registration.event.Event;
import com.netgroup.event_registration.event.EventNotFoundException;
import com.netgroup.event_registration.event.EventRepository;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {
    private static final RegisterForEventRequest REQUEST =
            new RegisterForEventRequest("Mari", "Tamm", "49002029999");

    @Mock
    private EventRepository eventRepository;

    @Mock
    private RegistrationRepository registrationRepository;

    @InjectMocks
    private RegistrationService registrationService;

    @Test
    void registerForEventSavesRegistrationWhenEventHasAvailableSpots() {
        Event event = createEvent(1L, 20);

        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(registrationRepository.existsByEventIdAndPersonalCode(1L, REQUEST.personalCode())).thenReturn(false);
        when(registrationRepository.countByEventId(1L)).thenReturn(5L);
        when(registrationRepository.save(any(Registration.class))).thenAnswer(invocation -> {
            Registration savedRegistration = invocation.getArgument(0);
            savedRegistration.setId(10L);
            return savedRegistration;
        });

        RegistrationResponse response = registrationService.registerForEvent(1L, REQUEST);

        ArgumentCaptor<Registration> registrationCaptor = ArgumentCaptor.forClass(Registration.class);
        verify(registrationRepository).save(registrationCaptor.capture());

        Registration savedRegistration = registrationCaptor.getValue();
        assertThat(savedRegistration.getEvent()).isSameAs(event);
        assertThat(savedRegistration.getFirstName()).isEqualTo("Mari");
        assertThat(savedRegistration.getLastName()).isEqualTo("Tamm");
        assertThat(savedRegistration.getPersonalCode()).isEqualTo("49002029999");

        assertThat(response.id()).isEqualTo(10L);
        assertThat(response.eventId()).isEqualTo(1L);
        assertThat(response.firstName()).isEqualTo("Mari");
        assertThat(response.lastName()).isEqualTo("Tamm");
        assertThat(response.personalCode()).isEqualTo("49002029999");
    }

    @Test
    void registerForEventThrowsWhenEventDoesNotExist() {
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> registrationService.registerForEvent(1L, REQUEST))
                .isInstanceOf(EventNotFoundException.class)
                .hasMessage("Event with id 1 was not found.");

        verify(registrationRepository, never()).save(any());
    }

    @Test
    void registerForEventThrowsWhenParticipantAlreadyRegistered() {
        Event event = createEvent(1L, 20);

        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(registrationRepository.existsByEventIdAndPersonalCode(1L, REQUEST.personalCode())).thenReturn(true);

        assertThatThrownBy(() -> registrationService.registerForEvent(1L, REQUEST))
                .isInstanceOf(DuplicateRegistrationException.class)
                .hasMessage("Participant is already registered for this event.");

        verify(registrationRepository, never()).save(any());
    }

    @Test
    void registerForEventThrowsWhenEventIsFullyBooked() {
        Event event = createEvent(1L, 2);

        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(registrationRepository.existsByEventIdAndPersonalCode(1L, REQUEST.personalCode())).thenReturn(false);
        when(registrationRepository.countByEventId(1L)).thenReturn(2L);

        assertThatThrownBy(() -> registrationService.registerForEvent(1L, REQUEST))
                .isInstanceOf(EventFullyBookedException.class)
                .hasMessage("Event is fully booked.");

        verify(registrationRepository, never()).save(any());
    }

    private Event createEvent(Long id, int maxParticipants) {
        Event event = new Event();
        event.setId(id);
        event.setTitle("Summer School");
        event.setEventTime(LocalDateTime.of(2026, 7, 10, 18, 0));
        event.setMaxParticipants(maxParticipants);
        return event;
    }
}
