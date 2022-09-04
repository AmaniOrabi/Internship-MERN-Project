import React from "react";
import { Card, Box, CardContent, Divider, IconButton } from "@mui/material";
import Timer from "./timer";
import PlayersList from "./playerCard";
import { useEffect, useState, useContext } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SocketContext } from "../../contexts/socketContext";

export default function VoteBox({ room_id }) {
  const boxStyle = {
    width: "27%",
    position: "absolute",
    left: "1000px",
    top: "227px",
  };

  const flexStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
  };

  const roomItemStyle = {
    margin: 5,
  };
  // const waitingForStyle = {
  //   textAlign: "center",
  //   backgroundColor: "#0693E3",
  //   color: "white",
  //   padding: 3,
  // };

  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState([]);
  const [showRoom, setShowRoom] = useState(false);

  useEffect(() => {
    socket.on("new_player_added", (data) => {
      console.log("data " + data);
      setPlayers(data);
      console.log("players " + players);
    });
  }, [players, socket, room_id]);

  const handleShowRoom = () => {
    showRoom ? setShowRoom(false) : setShowRoom(true);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(room_id);
  };

  return (
    <div className="voteBox">
      <Box sx={boxStyle}>
        <Card>
          <CardContent style={flexStyle}>
            <h3>Players : </h3>
            <Timer />
          </CardContent>
          <Divider />

          <CardContent>
            {players &&
              players.map((pl, i) => {
                return <PlayersList key={i} playerName={pl} />;
              })}
          </CardContent>
          <Divider />

          <CardContent style={{ paddingBottom: 0 }}>
            <div style={flexStyle}>
              <h3>Invite a teammate</h3>
              <IconButton
                style={{ boxShadow: "none" }}
                onClick={handleShowRoom}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </div>
          </CardContent>
          {showRoom && (
            <CardContent style={flexStyle}>
              <Box component="span" sx={{ border: 2, borderColor: "grey.500" }}>
                <h4 style={roomItemStyle}>{room_id}</h4>
              </Box>
              <IconButton onClick={copyToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </CardContent>
          )}
        </Card>
      </Box>
    </div>
  );
}
