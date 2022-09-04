import { createContext, useReducer } from "react";

export const RoomsContext = createContext();

export const roomsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROOMS":
      return {
        rooms: action.payload,
      };
    case "CREATE_ROOMS":
      return {
        rooms: [action.payload, ...state.rooms],
      };
    case "DELETE_ROOMS":
      return {
        rooms: state.rooms.filter((r) => r._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const RoomsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomsReducer, {
    rooms: null,
  });

  return (
    <RoomsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoomsContext.Provider>
  );
};
