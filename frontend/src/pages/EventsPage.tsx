import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RegisterEventDialog from "../components/dialogs/RegisterEventDialog";
import { useEvents } from "../hooks/useEvents";
import { formatEventTime } from "../utils/dateTimeFormatters";
import getApiErrorMessage from "../utils/getApiErrorMessage";

export default function EventsPage() {
  const { data: events, isLoading, error } = useEvents();

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  if (isLoading) {
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

        {!error && events.length === 0 && (
          <Alert severity="info">No events have been created yet.</Alert>
        )}

        {!error && events.length > 0 && (
          <Stack spacing={2} sx={{ width: "100%" }}>
            {events.map((event) => (
              <Card key={event.id} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {formatEventTime(event.eventTime)}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    Available spots: {event.availableSpots} /{" "}
                    {event.maxParticipants}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => setSelectedEventId(event.id)}
                    size="small"
                    disabled={event.availableSpots === 0}
                  >
                    Register
                  </Button>
                </CardActions>
              </Card>
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
