import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import symbol from "../../assets/images/card.png";

export default function PokerCards({ number }) {
  const boxStyle = {
    borderRadius: 1,
    width: 110,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 5,
    boxShadow: 1,
    ":hover": {
      boxShadow: "0 0 13px rgba(33,33,33,.2)",
    },
  };

  const cardStyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
  };
  const imgStyle = {
    width: "80%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const hStyle = {
    textAlign: "right",
  };
  return (
    <div className="pokerCards">
      <Box sx={boxStyle}>
        <Card>
          <CardContent style={cardStyle}>
            <h3>{number} </h3>
            <img src={symbol} alt="symbol" style={imgStyle} />
            <h3 style={hStyle}>{number} </h3>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
