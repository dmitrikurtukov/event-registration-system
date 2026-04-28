import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

export function useAppHeader() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(menuAnchorElement);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorElement(null);
  };

  const goHome = () => {
    closeMenu();
    navigate("/");
  };

  const goAdmin = () => {
    closeMenu();
    navigate("/admin");
  };

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate("/");
  };

  return {
    isLoggedIn,
    isMenuOpen,
    menuAnchorElement,
    goHome,
    goAdmin,
    handleLogout,
    openMenu,
    closeMenu,
  };
}
