import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("accessToken");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });

    //redirect to login page
    navigateLogin();
  };
  return { logout };
};
