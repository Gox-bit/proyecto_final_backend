const express = require("express");
const router = express.Router();
const { getGames, createGame, updateGame, deleteGame } = require("../Controllers/GameController");

router.get("/", getGames);
router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

module.exports = router;