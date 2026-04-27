import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useRegisterEventDialog } from "../../hooks/useRegisterEventDialog";
import getApiErrorMessage from "../../utils/getApiErrorMessage";

interface Props {
  eventId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function RegisterEventDialog({
  eventId,
  open,
  onClose,
}: Readonly<Props>) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleClose,
    isPending,
    error,
  } = useRegisterEventDialog(eventId, onClose);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Register for event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your details to register for this event.
        </DialogContentText>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="event-registration-form"
          noValidate
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <TextField
              {...register("firstName", {
                required: "First name is required.",
                maxLength: {
                  value: 100,
                  message: "First name cannot exceed 100 characters.",
                },
              })}
              autoFocus
              margin="normal"
              label="First name"
              fullWidth
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              {...register("lastName", {
                required: "Last name is required.",
                maxLength: {
                  value: 100,
                  message: "Last name cannot exceed 100 characters.",
                },
              })}
              margin="normal"
              label="Last name"
              fullWidth
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Stack>

          <TextField
            {...register("personalCode", {
              required: "Personal code is required.",
              pattern: {
                value: /^\d{11}$/,
                message: "Personal code must be exactly 11 digits.",
              },
            })}
            margin="normal"
            label="Personal code"
            fullWidth
            variant="outlined"
            error={!!errors.personalCode}
            helperText={
              errors.personalCode?.message || "Must contain 11 digits."
            }
          />
          {error && (
            <Alert
              severity="error"
              sx={{ mt: 2 }}
              className="animate__animated animate__bounceIn"
            >
              {getApiErrorMessage(error)}
            </Alert>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="event-registration-form"
          disabled={isPending}
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
