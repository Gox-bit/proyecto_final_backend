// ARCHIVO CORREGIDO: routes/reviews.js

const express = require('express');
// IMPORTANTE: Usamos mergeParams para que las rutas anidadas desde games.js funcionen
const router = express.Router({ mergeParams: true });

const {
  getReviewsForGame,
  getReview, // Necesitarás una función para obtener una sola review
  createReview,
  updateReview,
  deleteReview
} = require('../Controllers/ReviewController');

const { protect } = require('../middleware/authMiddleware');

// Rutas que vienen de /api/games/:gameId/reviews
router.route('/')
  .get(protect, getReviewsForGame)
  .post(protect, createReview);

// Rutas que vienen de /api/reviews/:reviewId
router.route('/:reviewId')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;