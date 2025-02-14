const mongoose = require('mongoose');

// Definir el esquema de la colección "series"
const serieSchema = new mongoose.Schema({
  _id: String, // ID de la serie
  name: { type: String, required: true },
  release_date: { type: String, required: true },
  average_score: { type: Number, required: true },
  reviews: { type: [String], default: [] } // Array de strings con los IDs de reviews
}, { versionKey: false }); // No añadir el campo __v

// Crear el modelo
const Serie = mongoose.model('Serie', serieSchema, 'series'); // Especificamos el nombre exacto de la colección

module.exports = Serie;
