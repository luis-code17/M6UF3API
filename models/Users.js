const mongoose = require('mongoose');

// Definir el esquema de la colección "users"
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reviews: { type: [String], default: [] } // Array de strings con los IDs de reviews
}, { versionKey: false }); // No añadir el campo __v

// Crear el modelo
const User = mongoose.model('User', userSchema, 'users'); // Especificamos el nombre exacto de la colección

module.exports = User;
