import { Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../auth/useAuth";
import AdminLoginForm from "../components/forms/AdminLoginForm";

export default function AdminPage() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h4" component="h1">
        Admin
      </Typography>

      {isLoggedIn ? (
        <Typography>Admin Panel</Typography>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 480 }}>
          <AdminLoginForm />
        </Box>
      )}
    </Stack>
  );
}
