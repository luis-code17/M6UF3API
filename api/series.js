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

module.exports = router;
