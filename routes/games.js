// routes/games.js
const express = require('express');
const router = express.Router();
const {
  getGames,
  createGame,
  updateGame,
  deleteGame
} = require('../Controllers/GameController'); // Asegúrate de que la ruta y mayúsculas/minúsculas sean correctas
const reviewRoutes = require('./Review');

router.use('/:gameId/reviews', reviewRoutes); // Rutas anidadas para reseñas
// Aquí no necesitas /games porque ya se define en server.js
router.route('/')
  .get(getGames)
  .post(createGame); // Aquí podrías añadir el middleware 'protect' si crear juegos es privado

router.route('/:id')
  .put(updateGame)   // Aquí también iría 'protect'
  .delete(deleteGame); // Y aquí

module.exports = router;