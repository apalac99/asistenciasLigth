const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  attendance: [Boolean], // Registro de asistencias
  absences: { type: Number, default: 0 }, // Número de faltas
});

module.exports = mongoose.model('Student', studentSchema);