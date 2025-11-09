const Game = require("../models/Game"); 

const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos", error: error.message });
  }
};

const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json({ message: "Juego agregado", newGame });
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el juego", error: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedGame) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    
    res.json({ message: "Juego actualizado", updatedGame });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el juego", error: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.status(200).json({ message: "Juego eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el juego", error: error.message });
  }
};


module.exports = {
  getGames,
  createGame, 
  updateGame,
  deleteGame
};