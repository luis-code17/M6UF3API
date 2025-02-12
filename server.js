require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const seriesRoutes = require('./api/series'); // Importamos las rutas

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Error connecting to MongoDB:', err));

// Usar las rutas
app.use('/allSeries', seriesRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});


/* EJEMPLO DE RUTAS

  // Definició del model de dades (un exemple simple d'un model de "Usuari")
  const userSchema = new mongoose.Schema({
    name: String,
    email: String

    // Deberia ser 
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }
    //
  });

  const User = mongoose.model('User', userSchema);


  app.post('/users', async (req, res) => {
    /// res.status(200).json(req.body);
    // Check if request body is empty and fill with default values
    if (!req.body.name || !req.body.email) {
      req.body.name = req.body.name || "err";
      req.body.email = req.body.email || "err";
    }

    try {
      const user = new User({ name: req.body.name, email: req.body.email });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: 'Error creating user', error: err.message });
    }
  });

  // Ruta per obtenir tots els usuaris
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  });

  // Ruta per obtenir un usuari per ID
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
  });

  // Ruta per actualitzar un usuari per ID
  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: 'Error updating user', error: err.message });
    }
  });

  // Ruta per eliminar un usuari per ID
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
  });
*/




