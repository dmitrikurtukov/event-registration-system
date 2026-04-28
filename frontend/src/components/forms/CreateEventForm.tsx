import { Alert, Button, Paper, Stack, TextField } from "@mui/material";

import { useCreateEventForm } from "../../hooks/useCreateEventForm";
import getApiErrorMessage from "../../utils/getApiErrorMessage";

export default function CreateEventForm() {
  const { register, handleCreateEvent, error, errors, isPending } =
    useCreateEventForm();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <form onSubmit={handleCreateEvent} noValidate>
        <Stack spacing={2}>
          <TextField
            {...register("title")}
            label="Title"
            type="text"
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />

          <TextField
            {...register("eventTime")}
            label="Event time"
            type="datetime-local"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!errors.eventTime}
            helperText={errors.eventTime?.message}
            fullWidth
          />

          <TextField
            {...register("maxParticipants")}
            label="Max participants"
            type="number"
            error={!!errors.maxParticipants}
            helperText={errors.maxParticipants?.message}
            fullWidth
          />

          {error && (
            <Alert
              className="animate__animated animate__bounceIn"
              severity="error"
            >
              {getApiErrorMessage(error)}
            </Alert>
          )}

          <Button type="submit" variant="contained" disabled={isPending}>
            Create event
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
