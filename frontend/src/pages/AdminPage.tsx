import { Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../auth/useAuth";
import AdminLoginForm from "../components/forms/AdminLoginForm";
import CreateEventForm from "../components/forms/CreateEventForm";

export default function AdminPage() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h4" component="h1">
        {isLoggedIn ? "Create a new event" : "Log in as admin"}
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 480 }}>
        {isLoggedIn ? <CreateEventForm /> : <AdminLoginForm />}
      </Box>
    </Stack>
  );
}
