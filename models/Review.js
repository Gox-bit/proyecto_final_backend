// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  comentario: {
    type: String,
    required: [true, 'El comentario no puede estar vacío.'],
    trim: true,
    maxlength: [500, 'El comentario no puede exceder los 500 caracteres.']
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria.'],
    min: 1,
    max: 10
  },
  juego: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// ---- AQUÍ VA LA LÓGICA PARA CALCULAR EL PROMEDIO ----

// Método estático para calcular el promedio de puntuaciones de un juego
reviewSchema.statics.recalcularPromedio = async function(juegoId) {
  const stats = await this.aggregate([
    { $match: { juego: juegoId } },
    {
      $group: {
        _id: '$juego',
        numReseñas: { $sum: 1 },
        promedio: { $avg: '$puntuacion' }
      }
    }
  ]);

  try {
    // Actualizamos el documento del juego con los nuevos valores
    await this.model('Game').findByIdAndUpdate(juegoId, {
      puntuacionPromedio: stats[0] ? Math.round(stats[0].promedio * 10) / 10 : 0, // Redondeado a 1 decimal
      numReseñas: stats[0] ? stats[0].numReseñas : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Llama al método estático después de que una reseña se guarda
reviewSchema.post('save', function() {
  this.constructor.recalcularPromedio(this.juego);
});

// Llama al método estático antes de que una reseña se elimine
reviewSchema.post('remove', function() {
  this.constructor.recalcularPromedio(this.juego);
});


const Review = mongoose.model('Review', reviewSchema);

// Este archivo solo debe exportar el modelo Review.
module.exports = Review;