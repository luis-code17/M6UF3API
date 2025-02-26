const mongoose = require('mongoose');

// Definir el esquema de la colección "reviews"
const reviewSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  series_id: { type: String, required: true },
  date: { type: String, required: true },
  comment: { type: String, required: true },
  score: { type: Number, required: true }
}, { versionKey: false }); // No añadir el campo __v

// Crear el modelo
const Review = mongoose.model('Review', reviewSchema, 'reviews'); // Especificamos el nombre exacto de la colección

module.exports = Review;
