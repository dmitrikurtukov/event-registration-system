import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import type { EventResponse } from "../../services/event-service";
import { formatEventTime } from "../../utils/dateTimeFormatters";

interface Props {
  event: EventResponse;
  onRegister: (eventId: number) => void;
}

export default function EventCard({ event, onRegister }: Readonly<Props>) {
  const isFullyBooked = event.availableSpots === 0;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h2">
          {event.title}
        </Typography>

        <Typography color="text.secondary">
          {formatEventTime(event.eventTime)}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Available spots: {event.availableSpots} / {event.maxParticipants}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => onRegister(event.id)}
          size="small"
          disabled={isFullyBooked}
        >
          {isFullyBooked ? "Fully booked" : "Register"}
        </Button>
      </CardActions>
    </Card>
  );
}
