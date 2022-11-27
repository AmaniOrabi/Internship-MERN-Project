const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    // date: Date,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    room_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: true,
    },
    players: {
      type: [mongoose.Schema.ObjectId],
      ref: "Player",
    },
    final_vote: Number,
    avg_vote: Number,
    completed: Boolean,
    duration: Number,
    score: {
      player_id: {
        type: [mongoose.Schema.ObjectId],
        ref: "Player",
      },
      player_duration: Number,
      vote: Number,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
