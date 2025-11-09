// Controllers/GameController.js

const Game = require("../models/Game"); // Importamos el modelo aquí

// Función para OBTENER todos los juegos
const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos", error: error.message });
  }
};

// Función para CREAR un juego
const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json({ message: "Juego agregado", newGame });
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el juego", error: error.message });
  }
};

// Función para ACTUALIZAR un juego
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

// Función para ELIMINAR un juego
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

// ¡ESTA ES LA PARTE CLAVE!
// Exportamos un objeto que contiene todas nuestras funciones.
module.exports = {
  getGames,
  createGame, // Nota: he usado 'createGame' que es más descriptivo que 'newGame'
  updateGame,
  deleteGame
};