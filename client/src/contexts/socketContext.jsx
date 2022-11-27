import io from "socket.io-client";
import { createContext } from "react";

export const socket = io.connect("http://localhost:5000");
export const SocketContext = createContext();
