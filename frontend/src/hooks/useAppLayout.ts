import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function useAppLayout() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const goHome = () => {
    navigate("/");
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      goHome();
      return;
    }

    navigate("/admin");
  };

  return {
    isLoggedIn,
    goHome,
    handleAuthClick,
  };
}
