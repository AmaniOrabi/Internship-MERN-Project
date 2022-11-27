const Player = require("../models/playerModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//login player
const loginPlayer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const player = await Player.login(email, password);

    //create a token
    const token = createToken(player._id);
    const firstName = player.firstName;
    const lastName = player.lastName;
    const player_id = player._id;

    res.status(200).json({ email, token, player_id, firstName, lastName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup player
const signupPlayer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const player = await Player.signup(firstName, lastName, email, password);
    //create token
    const token = createToken(player._id);
    const player_id = player._id;
    res.status(200).json({ email, token, player_id, firstName, lastName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginPlayer, signupPlayer };
