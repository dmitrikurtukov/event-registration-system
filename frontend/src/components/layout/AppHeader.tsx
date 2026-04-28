import {
  AdminPanelSettings,
  Event,
  EventAvailable,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { useAppHeader } from "../../hooks/useAppHeader";

export function AppHeader() {
  const {
    isLoggedIn,
    isMenuOpen,
    menuAnchorElement,
    goHome,
    goAdmin,
    handleLogout,
    openMenu,
    closeMenu,
  } = useAppHeader();

  return (
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
        <Box component="nav" sx={{ display: { xs: "none", sm: "block" } }}>
          <Stack direction="row" spacing={1}>
            <Button
              onClick={goHome}
              startIcon={<EventAvailable />}
              color="inherit"
            >
              Events
            </Button>
            <Button
              onClick={goAdmin}
              startIcon={<AdminPanelSettings />}
              color="inherit"
            >
              Admin
            </Button>
            {isLoggedIn && (
              <Button
                onClick={handleLogout}
                startIcon={<Logout />}
                color="inherit"
              >
                Logout
              </Button>
            )}
          </Stack>
        </Box>
        <Box component="nav" sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="Open navigation menu"
            aria-controls={isMenuOpen ? "app-navigation-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="app-navigation-menu"
            anchorEl={menuAnchorElement}
            open={isMenuOpen}
            onClose={closeMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={goHome}>Events</MenuItem>
            <MenuItem onClick={goAdmin}>Admin</MenuItem>
            {isLoggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
