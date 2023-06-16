const { Router } = require("express");
const { validationResult, check } = require('express-validator');
const {
  createUsuario,
  getUsuarios,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/usuario");
const Usuario = require("../models/Usuario");
const bycript = require('bcryptjs');

const router = Router();

//Crear
router.post("/", createUsuario);

//Listar
router.get("/", getUsuarios);

//Editar
router.put("/:id", editarUsuario);

//Eliminar
router.delete("/:id", eliminarUsuario);

module.exports = router;
