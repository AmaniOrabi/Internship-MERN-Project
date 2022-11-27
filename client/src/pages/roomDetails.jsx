import React from "react";
import Stories from "../components/room/stories";
import VoteBox from "../components/room/voteBox";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import ProfileAvatar from "../components/board/profileAvatar";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useContext } from "react";
import { ReactComponent as BlueLogo } from "../assets/images/cognira-logo-blue.svg";
import PokerCards from "../components/room/pokerCard";
import Grid from "@mui/material/Grid";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import { SocketContext } from "../contexts/socketContext";
import Chart from "../components/room/chart";

export default function RoomDetails() {
  const roomStyle = {
    backgroundColor: "aliceblue",
    backgroundRepeat: "repeat",
    position: "absolute",
    backgroundSize: "cover",
    minWidth: "100%",
    minHeight: "100%",
  };
  const appBarStyle = {
    position: "static",
    background: "white",
    boxShadow: "none",
    marginRight: "20px",
  };

  const hStyle = {
    marginBottom: "50px",
    marginTop: "40px",
    marginRight: "20px",
    marginLeft: "20px",
    color: "black",
    fontSize: "25px",
  };

  const logoStyle = {
    width: "50px ",
    marginLeft: "120px ",
    marginTop: "30px ",
  };

  const gridStyle = {
    display: "flex",
    justifyContent: "center",
    padding: 5,
  };

  const iconStyle = { color: "#4D4D4D", fontSize: "17px" };
  const numbers = [
    "0",
    "1/2",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "20",
    "40",
    "100",
    "?",
    <LocalCafeOutlinedIcon style={iconStyle} />,
  ];

  const { room_id } = useParams();
  const { player } = useAuthContext();
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);
  const [votes, setVotes] = useState([]);

  const roomName = async () => {
    if (!room_id || !player) {
      return;
    }
    await fetch(`http://localhost:5000/api/rooms/${room_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${player.token}`,
      },
    })
      .then((res) => res.json())
      .then((room) => {
        setName(room.name);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  roomName();

  const handleVote = (number) => {
    socket.emit("send_vote", {
      vote: number,
      player_id: player.player_id,
    });
    socket.on("receive_vote", (data) => {
      console.log(data);
      setVotes((votes) => [...votes, data]);
      console.log(votes);
    });
  };

  return (
    <div className="roomStories" style={roomStyle}>
      <AppBar style={appBarStyle}>
        <Toolbar>
          <Link to="/">
            <BlueLogo style={logoStyle} />
            <ProfileAvatar />
          </Link>
          <h1 style={hStyle}>{name} </h1>
        </Toolbar>
      </AppBar>
      {votes.length < 2 ? (
        <div>
          <Grid container md={6} ml="110px" sx={gridStyle}>
            {numbers.map((number) => (
              <Grid item md={2.2} onClick={() => handleVote(number)}>
                <PokerCards number={number} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Chart votes={votes} />
      )}
      <br />
      <br />
      <br />
      <Stories room_id={room_id} />
      <VoteBox room_id={room_id} />
      <br />
      <br />
    </div>
  );
}
