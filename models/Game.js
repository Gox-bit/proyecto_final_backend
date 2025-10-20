const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  plataforma: {
    type: String,
    required: true
  },
  horas: {
    type: Number,
    required: false
  },
  estado: {
    type: String,
    required: false
  },
  reseña: {
    type: String,
    required: false
  },
  puntuacion: {
    type: Number,
    min: 0,
    max: 10,
    required: false
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
