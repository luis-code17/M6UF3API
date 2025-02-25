const express = require('express');
const Review = require('../models/Reviews');
const Serie = require('../models/Series');
const User = require('../models/Users');

const router = express.Router();

// Obtener todas las series (GET /reviews)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});


// Obtener reviews por rango de fechas (GET /reviews/byDate?minDate=YYYY-MM-DD&maxDate=YYYY-MM-DD)
router.get('/byDate', async (req, res) => {
  try {
    // Obtener los parámetros de la URL
    const { minDate, maxDate } = req.query;

    // Validar que se envíen las fechas
    if (!minDate || !maxDate) {
      return res.status(400).json({ message: 'Both minDate and maxDate are required' });
    }

    // Buscar reviews en el rango de fechas
    const review = await Review.find({
      date: { $gte: minDate, $lte: maxDate }
    });

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// Añadir una review (POST /review)
router.post('/', async (req, res) => {
  try {
    const { _id, user_id, series_id, comment, score } = req.body;

    // Validación de campos obligatorios
    if (!_id || score === undefined || !comment || !user_id || !series_id) {
      return res.status(400).json({ message: 'All fields (_id, score, comment, user_id, series_id) are required' });
    }

    // Asignar valores por defecto
    const date = new Date().toISOString().split('T')[0];

    // Crear la review
    const review = new Review({
      _id,
      date,
      comment,
      score,
      user_id,
      series_id
    });

    await review.save();

    // Añadir la review a la serie
    const updatedSerie = await Serie.findByIdAndUpdate(
      series_id,
      { $push: { reviews: _id } },
      { new: true }
    );

    // Añadir la review al usuario
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $push: { reviews: _id } },
      { new: true }
    );

    if (!updatedSerie) {
      return res.status(404).json({ message: 'Serie not found' });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
});

//obtener por el id del usuario (GET /reviews/byUser?user_id=123)
router.get('/byUser', async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const reviews = await Review.find({ user_id });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
}
);

//obtener por el id de la serie (GET /reviews/bySerie?series_id=123)
router.get('/bySerie', async (req, res) => {
  try {
    const { series_id } = req.query;

    if (!series_id) {
      return res.status(400).json({ message: 'series_id is required' });
    }

    const reviews = await Review.find({ series_id });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
}
);

module.exports = router;
