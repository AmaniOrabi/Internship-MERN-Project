import { RoomsContext } from "../contexts/roomContext";
import { useContext } from "react";

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);

  if (!context) {
    throw Error("Error accured : Context must be used in the provider");
  }

  return context;
};
