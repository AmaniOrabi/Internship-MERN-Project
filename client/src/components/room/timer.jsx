import React from "react";
import { useStopwatch } from "react-timer-hook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Timer() {
  const { seconds, minutes, hours, days } =
    //   isRunning, start, pause, reset
    useStopwatch({ autoStart: true });
  const stopwatchStyle = {
    textAlign: "right",
    color: "#007FD3",
    fontWeight: "bold",
    fontSize: "20px",
  };
  const iconStyle = {
    color: "#C5C5C5",
    marginRight: "5px",
    marginBottom: "-3px",
  };
  return (
    <div className="timer" style={stopwatchStyle}>
      <AccessTimeIcon style={iconStyle} />
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button> */}
    </div>
  );
}
