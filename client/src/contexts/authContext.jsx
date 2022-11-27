import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { player: action.payload };
    case "LOGOUT":
      return { player: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { player: null });

  useEffect(() => {
    const player = JSON.parse(localStorage.getItem("accessToken"));
    if (player) {
      dispatch({ type: "LOGIN", payload: player });
    }
  }, []);

  console.log("Auth Context State : ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
