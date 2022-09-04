import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ProfileAvatar from "./profileAvatar";
import { Link } from "react-router-dom";
import { ReactComponent as BlueLogo } from "../../assets/images/cognira-logo-blue.svg";

function BoardNavbar() {
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

  return (
    <div>
      <AppBar style={appBarStyle}>
        <Toolbar>
          <Link to="/">
            <BlueLogo style={ logoStyle } />
            <ProfileAvatar />
          </Link>
          <h1 style={hStyle}>Rooms</h1>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default BoardNavbar;
