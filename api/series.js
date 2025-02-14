const express = require('express');
const Serie = require('../models/Series'); // Importamos el modelo

const router = express.Router();

// Obtener todas las series (GET /series)
router.get('/', async (req, res) => {
  try {
    const series = await Serie.find();
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching series', error: err.message });
  }
});


// Obtener series por rango de fechas (GET /series/byDate?minDate=YYYY-MM-DD&maxDate=YYYY-MM-DD)
router.get('/byDate', async (req, res) => {
  try {
    // Obtener los parámetros de la URL
    const { minDate, maxDate } = req.query;

    // Validar que se envíen las fechas
    if (!minDate || !maxDate) {
      return res.status(400).json({ message: 'Both minDate and maxDate are required' });
    }

    // Buscar series en el rango de fechas
    const series = await Serie.find({
      release_date: { $gte: minDate, $lte: maxDate }
    });

    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching series', error: err.message });
  }
});

// Añadir una serie (POST /series)
router.post('/', async (req, res) => {
  try {
    const { _id, name, average_score, reviews } = req.body;

    // Validación de campos obligatorios
    if (!_id || !name || average_score === undefined) {
      return res.status(400).json({ message: 'All fields (_id, name, average_score) are required' });
    }

    // Asignar valores por defecto
    const release_date = req.body.release_date || new Date().toISOString().split('T')[0];
    const serie = new Serie({
      _id,
      name,
      release_date,
      average_score,
      reviews: reviews || [] // Si no hay reviews, inicializa como un array vacío
    });

    await serie.save();
    res.status(201).json(serie);
  } catch (err) {
    res.status(400).json({ message: 'Error creating serie', error: err.message });
  }
});

module.exports = router;
