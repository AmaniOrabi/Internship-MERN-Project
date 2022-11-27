import React from "react";
import { Card, Box, CardContent } from "@mui/material";

export default function Chart({ votes }) {
  const findAvg = () => {
    var total = 0;
    votes.forEach((vote) => (total += vote));
    return total / votes.length;
  };

  const cardStyle = {
    maxWidth: 300,
    textAlign: "center",
  };
  const boxStyle = {
    position: "relative",
    top: "115px",
    left: "390px",
  };
  const cardContStyle = {
    textAlign: "center",
    backgroundColor: "#0693E3",
    color: "white",
    padding: 3,
  };

  return (
    <div>
      <Box style={boxStyle}>
        <Card style={cardStyle}>
          <CardContent style={cardContStyle}>
            <h2>Average Vote </h2>
          </CardContent>
          <CardContent>
            <h2 style={{ fontSize: 45, color: "grey" }}>70</h2>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
