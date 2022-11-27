const mongoose = require("mongoose");
const Room = require("../models/roomModel");

//get all rooms
const getRooms = async (req, res) => {
  const player_id = req.player._id;
  const rooms = await Room.find({ player_id }).sort({ createdAt: -1 });
  res.status(200).json(rooms);
};

//get a single room
const getRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No room found with that ID !" });
  }
  const room = await Room.findById(id);
  if (!room) {
    return res.status(404).json({ error: "No room found with that ID !" });
  }
  res.status(200).json(room);
};

//create a room
const createRoom = async (req, res) => {
  const { name } = req.body;
  //add doc to db
  try {
    const player_id = req.player._id;
    const room = await Room.create({
      name,
      player_id,
      
    });

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a room
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No room found with that ID !" });
  }
  const room = await Room.findOneAndDelete({ _id: id });
  if (!room) {
    return res.status(404).json({ error: "No room found with that ID !" });
  }
  res.status(200).json(room);
};

//update a room
const updateRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "room does not exist !" });
  }
  const room = await Room.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      $push: { players: req.body.newPlayer },
    }
  );

  if (!room) {
    return res.status(404).json({ error: "No room found with that ID !" });
  }
  res.send(room);
  res.status(200).json(room);
};

module.exports = {
  getRoom,
  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
};
