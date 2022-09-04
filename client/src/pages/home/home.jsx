import React from "react";
import Wave from "../../components/home/wave";
import "./home.css";
import Button from "@mui/material/Button";
import HomeNavbar from "../../components/home/homeNavbar";
// import Footer from "../../components/footer";

function Home() {
  return (
    <div className="home">
      <Wave />
      <HomeNavbar />
      <h1>CogPoker</h1>
      <p>The Cognira's Scrum Poker to estimate Agile Projects</p>
      <Button
        className="button"
        variant="outlined"
        color="inherit"
        sx={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        Start a Game
      </Button>
      <br />
      {/* <Footer/> */}
    </div>
  );
}

export default Home;
