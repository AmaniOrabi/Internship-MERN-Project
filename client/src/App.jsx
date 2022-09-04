import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Board from "./pages/board";
import RoomDetails from "./pages/roomDetails";

import { useAuthContext } from "./hooks/useAuthContext";
import PokerCards from "./components/room/pokerCard";


function App() {
  const { player } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={!player ? <Home /> : <Navigate to="/board" />}
          />
          <Route
            exact
            path="/login"
            element={!player ? <Login /> : <Navigate to="/board" />}
          />
          <Route
            exact
            path="/signup"
            element={!player ? <Signup /> : <Navigate to="/board" />}
          />
          <Route
            exact
            path="/board"
            element={player ? <Board /> : <Navigate to="/login" />}
          />
          <Route exact path="/roomDetails/:room_id" element={<RoomDetails />} />
          <Route exact path="/card" element={<PokerCards />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
