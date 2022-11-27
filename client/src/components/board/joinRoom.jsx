import React from "react";
import {
  Box,
  Divider,
  CardContent,
  Card,
  OutlinedInput,
  Button,
  Alert,
} from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { SocketContext } from "../../contexts/socketContext";

export default function JoinRoom() {
  const boxStyle = {
    width: "27%",
    position: "absolute",
    left: "1000px",
    top: "231px",
  };

  const cardTitleStyle = {
    textAlign: "center",
    backgroundColor: "#0693E3",
    color: "white",
    padding: 3,
  };

  const displayStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const { player } = useAuthContext();

  const navigate = useNavigate();
  const navigateRoom = () => {
    navigate(`/roomDetails/${room}`);
  };

  const socket = useContext(SocketContext);
  const [room, setRoom] = useState("");
  const [roomExists, setRoomExists] = useState(true);

  const joinRoom = async () => {
    //verify that the room exists
    const response = await fetch(`http://localhost:5000/api/rooms/${room}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${player.token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    //if the room exists, the player can join it
    if (response._id === room) {
      setRoomExists(true);
      console.log(player);
      const data = {
        room: room,
        player_id: player.player_id,
        firstName: player.firstName,
        lastName: player.lastName,
      };

      socket.emit("join_room", data);
      navigateRoom();
    } else {
      setRoomExists(false);
    }
  };

  return (
    <div>
      <Box sx={boxStyle}>
        <Card>
          <CardContent style={cardTitleStyle}>
            <h3>Join Room</h3>
          </CardContent>
          <Divider />
          <CardContent style={displayStyle}>
            <OutlinedInput
              placeholder="Room ID"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Button variant="outlined" onClick={joinRoom}>
              Join
            </Button>
          </CardContent>
        </Card>
        {!roomExists && (
          <>
            <br />
            <Alert severity="error">Room doesnt exist</Alert>
          </>
        )}
      </Box>
    </div>
  );
}
