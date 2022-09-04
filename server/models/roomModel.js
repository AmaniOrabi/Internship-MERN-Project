const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    players: {
      type: [String],
    },

    stories: {
      type: [mongoose.Schema.ObjectId],
      ref: "Story",
    },
    player_id: {
      type: [mongoose.Schema.ObjectId],
      ref: "Player",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
