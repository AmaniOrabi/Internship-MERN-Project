import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Header from "../header";

function HomeNavbar() {
  const appBarStyle = {
    position: "static",
    background: "transparent",
    boxShadow: "none",
    marginRight: "20px",
  };

  const buttonStyle1 = {
    color: "inherit",
    marginLeft: "auto",
  };
  const buttonStyle2 = {
    color: "inherit",
    marginLeft: "15px",
    marginRight: "80px",
  };
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };
  const navigateSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <AppBar style={appBarStyle}>
        <Toolbar>
          <Header />
          <Button style={buttonStyle1} onClick={navigateLogin}>
            Login
          </Button>
          <Button style={buttonStyle2} onClick={navigateSignup}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HomeNavbar;
