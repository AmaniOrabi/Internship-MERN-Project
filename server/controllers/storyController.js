const mongoose = require("mongoose");
const Story = require("../models/storyModel");
const Room = require("../models/roomModel");

//get all stories
const getStories = async (req, res) => {
  const { room_id } = req.params;
  const stories = await Story.find({ room_id });
  if (!stories) {
    return "Error accured !";
  }
  res.status(200).json(stories);
};

//get a single story
const getStory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No room found with that ID !" });
  }
  const story = await Story.findById(id);
  if (!story) {
    return res.status(404).json({ error: "No story found with that ID !" });
  }
  res.status(200).json(story);
};

//create a story
const createStory = async (req, res) => {
  const { title, room_id } = req.body;
  try {
    const story = await Story.create({
      title,
      room_id,
    });
    const room = await Room.findById(room_id);
    room.stories.push(story._id);
    room.save();
    res.status(200).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a story
const deleteStory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No story found with that ID !" });
  }

  const story = await Story.findOneAndDelete({ _id: id });
  if (!story) {
    return res.status(404).json({ error: "No story found with that ID !" });
  }
  console.log(story._id);
  const room = await Room.findById(story.room_id);
  room.stories.filter((s) => {
    s !== story._id;
  });
  room.save();
  res.status(200).json(story);
};

//update a story
const updateStory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "story does not exist !" });
  }
  const story = await Story.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
    }
  );

  if (!story) {
    return res.status(404).json({ error: "No story found with that ID !" });
  }
  res.status(200).json(story);
};

module.exports = {
  getStory,
  getStories,
  createStory,
  deleteStory,
  updateStory,
};
