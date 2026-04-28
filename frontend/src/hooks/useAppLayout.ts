import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function useAppLayout() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const goHome = () => {
    navigate("/");
  };

  const goAdmin = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    logout();
    goHome();
  };

  return {
    isLoggedIn,
    goHome,
    goAdmin,
    handleLogout,
  };
}
