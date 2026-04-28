import { Alert, Button, Paper, Stack, TextField } from "@mui/material";

import { useAdminLoginForm } from "../../hooks/useAdminLoginForm";
import getApiErrorMessage from "../../utils/getApiErrorMessage";

export default function AdminLoginForm() {
  const { register, handleLogin, error, errors, isPending } =
    useAdminLoginForm();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <form onSubmit={handleLogin} noValidate>
        <Stack spacing={2}>
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            {...register("password")}
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
