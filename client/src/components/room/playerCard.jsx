import React from "react";
import { IconButton, Avatar } from "@mui/material";

export default function PlayersList({ playerName }) {
  return (
    <div style={{ display: "flex" }}>
      <IconButton>
        <Avatar />
      </IconButton>
      <h4>{playerName}</h4>
    </div>
  );
}
