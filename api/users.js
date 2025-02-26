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

//Obtener por email (GET /users/byEmail?email=)
router.get('/byEmail', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});


// Añadir una serie (POST /users)
router.post('/', async (req, res) => {
  try {
    const { name, email, password, reviews } = req.body;

    // Validación de campos obligatorios
    if ( !name || !email || !password) {
      return res.status(400).json({ message: 'All fields (name, email, password) are required.' });
    }

    const user = new User({
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
