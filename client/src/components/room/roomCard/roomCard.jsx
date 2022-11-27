import React from "react";
import "./roomCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useRoomsContext } from "../../../hooks/useRoomsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TodayIcon from "@mui/icons-material/Today";
import { SocketContext } from "../../../contexts/socketContext";
import { useContext } from "react";

function RoomCard({ room }) {
  const { player } = useAuthContext();
  const { dispatch } = useRoomsContext();
  const socket = useContext(SocketContext);

  const navigate = useNavigate();
  const navigateRoomDetails = () => {
    navigate(`/roomDetails/${room._id}`);
  };

  const joinRoom = async () => {
    const data = {
      room: room._id,
      player_id: player.player_id,
      firstName: player.firstName,
      lastName: player.lastName,
    };

    socket.emit("join_room", data);
    navigateRoomDetails();
  };

  const handleDelete = async () => {
    if (!player) {
      return;
    }
    await fetch(`http://localhost:5000/api/rooms/${room._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${player.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "DELETE_WORKOUT", payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="roomCard" >
      <ol className="ol-cards">
        <Card onClick={joinRoom} className="cardDisplay">
          <CardContent className="cardContent">
            <Typography variant="h5" component="div" color="#007FD3">
              {room.name}
            </Typography>
          </CardContent>
          <CardActions>
            <TodayIcon color="action" className="dateIcon" />
            {room.createdAt.substring(0, 10)}
          </CardActions>
        </Card>
      </ol>
      <div>
        <IconButton aria-label="edit" className="editIcon">
          <EditIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          className="deleteIcon"
          onClick={() => {
            const confirmBox = window.confirm(
              "Do you really want to delete this room?"
            );
            if (confirmBox === true) {
              handleDelete();
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default RoomCard;
