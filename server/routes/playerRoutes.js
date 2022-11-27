const router = require("express").Router();
const {
  createPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
} = require("../controllers/playerController");
const { loginPlayer, signupPlayer } = require("../controllers/authController");

//get all players
router.get("/", getPlayers);

//get a player
router.get("/:id", getPlayer);

//create a player
router.post("/", createPlayer);

//delete a player
router.delete("/:id", deletePlayer);

//update a player
router.patch("/:id", updatePlayer);

//update password

//login
router.post("/login", loginPlayer);

//signup
router.post("/signup", signupPlayer);

module.exports = router;
