import * as React from "react";
import { useState, useEffect } from "react";
import RoomCard from "../components/room/roomCard/roomCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Tooltip,
  Box,
} from "@mui/material";
import BoardNavbar from "../components/board/boardNavbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRoomsContext } from "../hooks/useRoomsContext";
import JoinRoom from "../components/board/joinRoom";

function Board() {
  const boardStyle = {
    backgroundColor: "aliceblue",
    backgroundRepeat: "repeat",
    position: "absolute",
    backgroundSize: "cover",
    minWidth: "100%",
    minHeight: "100%",
  };
  const { player } = useAuthContext();
  const { rooms, dispatch } = useRoomsContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const roomName = { name };
  const handleCreate = async () => {
    if (!player) {
      return;
    }
    await fetch("http://localhost:5000/api/rooms", {
      method: "POST",
      body: JSON.stringify(roomName),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${player.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "CREATE_ROOMS", payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
    setName("");
    handleClose();
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:5000/api/rooms", {
        headers: { Authorization: `Bearer ${player.token}` },
      });

      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ROOMS", payload: json });
      }
    };

    if (player) {
      fetchRooms();
    }
  }, [dispatch, player, rooms]);

  return (
    <div className="board" style={boardStyle}>
      <BoardNavbar />
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        style={{ position: "relative", bottom: "28px", left: "1300px" }}
      >
        <Tooltip title="Add Room">
          <AddIcon />
        </Tooltip>
      </Fab>
      <br />
      <br />
      {rooms &&
        rooms.map((room) => (
          <Box style={{ marginRight: "30%" }}>
            <RoomCard key={room._id} room={room} />
          </Box>
        ))}
      ;
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "40%",
            height: "35%",
            position: "fixed",
            top: 100,
            m: 0,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: 27 }}>
          Create New Room
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room Name"
            type="text  "
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <JoinRoom />
    </div>
  );
}

export default Board;
