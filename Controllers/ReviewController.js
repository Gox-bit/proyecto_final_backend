const Review = require('../models/Review');
const Game = require('../models/Game'); 

const getReviewsForGame = async (req, res) => {
  try {
    const reviews = await Review.find({ juego: req.params.gameId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error: error.message });
  }
};


const createReview = async (req, res) => {
  try {
    req.body.juego = req.params.gameId;
    req.body.usuario = req.user.id;
    const gameExists = await Game.findById(req.params.gameId);
    if (!gameExists) {
      return res.status(404).json({ message: "No se puede crear la reseña porque el juego no existe." });
    }
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: "Reseña agregada", newReview });
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la reseña", error: error.message });
  }
};


const updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    if (review.usuario.toString() !== req.user.id) { 
      return res.status(401).json({ message: "No autorizado para modificar esta reseña." });
    }
    review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {new: true});  
    res.status(200).json({ message: "Reseña actualizada", review });
  } catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: "Error al actualizar la reseña", error: error.message }); }

    res.status(500).json({ message: "Error al actualizar la reseña", error: error.message });
  }
};


const deleteReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    if (review.usuario.toString() !== req.user.id) { 
      return res.status(401).json({ message: "No autorizado para eliminar esta reseña." });
    }
  review = await Review.findByIdAndDelete(req.params.reviewId);  
    res.status(200).json({ message: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error: error.message });
  }
};


module.exports = {
  getReviewsForGame,
  createReview,
  updateReview,
  deleteReview
};