import { Alert, Button, Paper, Stack, TextField } from "@mui/material";

import { useAdminLoginForm } from "../../hooks/useAdminLoginForm";
import getApiErrorMessage from "../../utils/getApiErrorMessage";

export default function AdminLoginForm() {
  const { register, handleSubmit, errors, onSubmit, isPending, error } =
    useAdminLoginForm();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            {...register("email", {
              required: "Email is required.",
            })}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            {...register("password", {
              required: "Password is required.",
            })}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
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
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
