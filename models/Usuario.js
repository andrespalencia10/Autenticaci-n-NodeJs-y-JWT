const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
  },
  email: {
    type: String,
    required: [true, "Email requerido"],
    unique: true,
  },
  contrasena: {
    type: String,
    required: [true, "Contraseña requerido"],
  },
  rol: {
    type: String,
    required: [true, "Rol requerido"],
    enum: ['ADMIN', 'DOCENTE'],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
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

module.exports = model("Usuario", UsuarioSchema);
