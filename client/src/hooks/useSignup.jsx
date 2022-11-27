import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/players/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the player to local storage
      localStorage.setItem("accessToken", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update the loading state
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
