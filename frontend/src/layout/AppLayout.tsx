import { Box, Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/layout/AppHeader";

export function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "grey.50",
      }}
    >
      <AppHeader />

      <Container maxWidth="sm" component="main" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
