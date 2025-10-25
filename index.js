const express = require("express");
const router = express.Router();
const Game = require("./models/Game");

// Obtener todos los juegos
router.get("/games", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// Crear un nuevo juego
router.post("/games", async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.json({ message: "Juego agregado", newGame });
});

// Actualizar un juego (PUT)
router.put("/games/:id", async (req, res) => {
  const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "Juego actualizado", updatedGame });
});

// Eliminar un juego
router.delete("/games/:id", async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ message: "Juego eliminado" });
});

module.exports = router;
