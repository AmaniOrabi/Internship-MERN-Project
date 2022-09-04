const mongoose = require("mongoose");
const Player = require("../models/playerModel");

//get all players
const getPlayers = async (req, res) => {
  const players = await Player.find({});
  res.status(200).json(players);
};

//get a single player
const getPlayer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No player found with that ID !" });
  }
  const player = await Player.findById(id);
  if (!player) {
    return res.status(404).json({ error: "No player found with that ID !" });
  }
  res.status(200).json(player);
};

//create a player
const createPlayer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const player = await Player.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a player
const updatePlayer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "player does not exist !" });
  }
  const player = await Player.findOneAndUpdate(
    { _id: id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
    }
  );

  if (!player) {
    return res.status(404).json({ error: "No player found with that ID !" });
  }
  res.status(200).json(player);
};

//delete a player
const deletePlayer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No player found with that ID !" });
  }
  const player = await Player.findOneAndDelete({ _id: id });
  if (!player) {
    return res.status(404).json({ error: "No player found with that ID !" });
  }
  res.status(200).json(player);
};

//update password
const updatePassword = async (req, res) => {
  const { email } = req.user;
  const { password, newPassword } = req.body;
  if (!password) {
    return res.status(400).json({ error: "provide your password" });
  }
  if (!newPassword) {
    return res.status(400).json({ error: "provide a valid new password" });
  }

  const player = await Player.findOne({ email: email }).select("+password");
  if (!player) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later !" });
  }
  if (!(await player.correctPassword(password, user.password))) {
    return res.status(401).json({ error: "Incorrect password !" });
  }
  var updatedPlayer = await Player.findOneAndUpdate(
    { email: email },
    { password: newPassword }
  );
  if (!updatedPlayer) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later !" });
  }
  return res.status(200).json({
    message: "password updated successfully",
    data: updatedUser,
  });
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
  updatePassword,
};
