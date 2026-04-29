import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EventCard from "../components/cards/EventCard";
import RegisterEventDialog from "../components/dialogs/RegisterEventDialog";
import { useEvents } from "../hooks/useEvents";
import getApiErrorMessage from "../utils/getApiErrorMessage";

export default function EventsPage() {
  const { data: events, isPending, error } = useEvents();
  const eventItems = events ?? [];

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  if (isPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h1">
          Events
        </Typography>

        {error && <Alert severity="error">{getApiErrorMessage(error)}</Alert>}

        {!error && eventItems.length === 0 && (
          <Alert severity="info">No events have been created yet.</Alert>
        )}

        {!error && eventItems.length > 0 && (
          <Stack spacing={2} sx={{ width: "100%" }}>
            {eventItems.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={setSelectedEventId}
              />
            ))}
          </Stack>
        )}
      </Stack>
      <RegisterEventDialog
        eventId={selectedEventId}
        open={selectedEventId !== null}
        onClose={() => setSelectedEventId(null)}
      />
    </>
  );
}
