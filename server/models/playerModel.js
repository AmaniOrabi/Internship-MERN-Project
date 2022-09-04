const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, ["Please enter a valid email"]],
  },

  password: {
    type: String,
    required: [true, "please enter your password"],
    unique: true,
  },

  role: {
    type: String,
    enum: ["player", "moderator", "observer"],
    default: "player",
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
  },
  stories: {
    story_id: {
      type: [mongoose.Schema.ObjectId],
      ref: "Story",
    },
    vote: Number,
    duration: Number,
  },
});

playerSchema.methods.correctPassword = async function (
  candidatePassword,
  playerPassword
) {
  return await bcrypt.compare(candidatePassword, playerPassword);
};

playerSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  //check if password and email exist
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }
  //validation
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak password");
  }

  const exists = await this.findOne({ email });

  //check if player exists
  if (exists) {
    throw Error("Email already used");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const player = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });
  return player;
};

playerSchema.statics.login = async function (email, password) {
  //check if password and email exist
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }
  //check if player exist
  const player = await this.findOne({ email }).select("+password");
  if (!player) {
    throw Error("Email doesn't exist");
  }

  //check if the password is correct

  if (!player || !(await player.correctPassword(password, player.password))) {
    throw Error("Wrong password");
  }
  return player;
};

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
