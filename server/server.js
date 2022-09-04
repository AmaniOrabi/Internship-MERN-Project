const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const playerRoutes = require("./routes/playerRoutes");
const roomRoutes = require("./routes/roomRoutes");
const storyRoutes = require("./routes/storyRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/players", playerRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/stories", storyRoutes);

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("dotenv").config({ path: "./config.env" });

const players = [];
// const votes = [];

io.on("connection", (socket) => {
  console.log(`Player Connected : ${socket.id}`);
  socket.broadcast.emit("message", "A new player has joined the room");

  //join a room
  socket.on("join_room", (data) => {
    players.push(data.firstName + " " + data.lastName);
    io.emit("new_player_added", players);
    socket.join(data.room);
    console.log(`Player with id ${data.player_id} joined room : ${data.room}`);
  });

  //add vote
  socket.on("send_vote", (data) => {
    // votes.push(data.vote);
    // console.log(votes);
    io.emit("receive_vote", data.vote);
    console.log(`Player with id ${data.player_id} voted : ${data.vote}`);
  });

  //disconnect
  socket.on("disconnect", () => {
    io.emit("leave_room", "A player has left the room");
    console.log("A player has left the room");
  });
});

process.on("uncaughtException", (err) => {
  console.log("unhandled Exception ,shutting down", err.name, err.message);
  console.log(err);
  if (server)
    server.close(() => {
      process.exit(1);
    });
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Connection established successfully");
  })
  .on("error", (error) => {
    console.log("error : ", error);
  });

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port " + process.env.PORT);
});
