const jwt = require("jsonwebtoken");
const Player = require("../models/playerModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Auth token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.player = await Player.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;
