import { Event, Login, Logout } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { Outlet } from "react-router-dom";
import { useAppLayout } from "../hooks/useAppLayout";

export function AppLayout() {
  const { isLoggedIn, goHome, handleAuthClick } = useAppLayout();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" component="header">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <ButtonBase onClick={goHome}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Event />
                <Typography variant="h6">Event Registration</Typography>
              </Stack>
            </ButtonBase>
          </Box>
          <Box component="nav">
            <Button
              onClick={handleAuthClick}
              startIcon={isLoggedIn ? <Logout /> : <Login />}
              color="inherit"
            >
              {isLoggedIn ? "Logout" : "Admin"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" component="main" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
