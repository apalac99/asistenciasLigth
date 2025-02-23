require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Endpoint para listar estudiantes que estudian ajedrez
app.get('/students/chess', async (req, res) => {
  try {
    const chessStudents = await Student.find({ course: 'Ajedrez' });
    res.json(chessStudents);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});