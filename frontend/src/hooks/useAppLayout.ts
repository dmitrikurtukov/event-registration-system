import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth-service";

export function useAppLayout() {
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();

  const goHome = () => {
    navigate("/");
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      authService.logout();
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
