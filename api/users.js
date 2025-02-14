const express = require('express');
const User = require('../models/Users'); // Importamos el modelo

const router = express.Router();

// Obtener todas las series (GET /series)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});


// Añadir una serie (POST /users)
router.post('/', async (req, res) => {
  try {
    const { _id, name, email, password, reviews } = req.body;

    // Validación de campos obligatorios
    if (!_id || !name || !email || !password) {
      return res.status(400).json({ message: 'All fields (_id, name, email, password) are required.' });
    }

    const user = new User({
      _id,
      name,
      email,
      password,
      reviews: reviews || [] // Si no hay reviews, inicializa como un array vacío
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
