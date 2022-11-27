const router = require("express").Router();

const {
  createStory,
  getStory,
  getStories,
  deleteStory,
  updateStory,
} = require("../controllers/storyController");

//get all stories
router.get("/:room_id", getStories);

//get a story
router.get("/:id", getStory);

//create a story
router.post("/", createStory);

//delete a story
router.delete("/:id", deleteStory);

//update a story
router.patch("/:id", updateStory);

module.exports = router;
