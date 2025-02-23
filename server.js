require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar el paquete cors
const Student = require('./models/Students');

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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