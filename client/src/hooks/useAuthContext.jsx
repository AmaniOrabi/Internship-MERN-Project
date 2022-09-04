import { AuthContext } from "./../contexts/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Error accured : Context must be used in the provider");
  }
  return context;
};
