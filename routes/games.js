const express = require('express');
const router = express.Router();
const {
  getGames,
  createGame,
  updateGame,
  deleteGame
} = require('../Controllers/GameController'); 
const reviewRoutes = require('./Review');

const { protect } = require('../middleware/authMiddleware');

router.use('/:gameId/reviews', reviewRoutes); 
router.route('/')
  .get(getGames)
  .post(createGame); 

router.route('/:id')
  .put(protect, updateGame) 
  .delete(protect, deleteGame); 

module.exports = router;