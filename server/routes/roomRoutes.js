const router = require("express").Router();
const {
  getRoom,
  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} = require("../controllers/roomController");
const requireAuth = require("../middleware/requireAuth");

//require auth for all routes
router.use(requireAuth);

//get all rooms
router.get("/", getRooms);

//get a room
router.get("/:id", getRoom);

//create a room
router.post("/", createRoom);

//delete a room
router.delete("/:id", deleteRoom);

//update a room
router.patch("/:id", updateRoom);

module.exports = router;
