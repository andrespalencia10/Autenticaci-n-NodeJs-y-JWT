const { Schema, model } = require("mongoose");

const EstadoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: new Date(),
  },
  fechaActualizacion: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Estado", EstadoSchema);