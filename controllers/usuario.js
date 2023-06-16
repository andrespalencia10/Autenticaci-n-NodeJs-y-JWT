const Usuario = require("../models/Usuario");
const { request, response } = require("express");
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs');
const { validarJWT, validarRolAdmin } = require("../middleware/validar-jwt");

const createUsuario = [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('email', 'invalid.email').isEmail(),
  check('rol', 'invalid.rol').isIn(['ADMIN', 'DOCENTE']),
  check('contrasena', 'invalid.contrasena').not().isEmpty(),
  validarJWT,
  validarRolAdmin,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ mensaje: errors.array() });

      const existeUsuario = await Usuario.findOne({ email: req.body.email });
      if (existeUsuario) return res.status(400).send('Email ya existe');

      const salt = bycript.genSaltSync();
      const contrasena = bycript.hashSync(req.body.contrasena, salt);

      const usuarioDB = await Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        rol: req.body.rol,
        contrasena,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      });

      res.send(usuarioDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Internal server error' });
    }
  }
];

const getUsuarios = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const usuarioDB = await Usuario.find({ estado });
    return res.json(usuarioDB);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const editarUsuario = [validarJWT, validarRolAdmin, async (req, resp) => {
  const { id } = req.params;
  const { nombre, email, estado, rol } = req.body;
  const nuevo = { nombre, email, estado, rol };
  Usuario.findByIdAndUpdate(id, nuevo, { new: true }).then((result) => {
    resp.json(result);
  });
}];

const eliminarUsuario = [validarJWT, validarRolAdmin, (req, resp) => {
  const { id } = req.params;
  Usuario.findByIdAndDelete(id).then((result) => {
    resp.json(result);
  });
}];

module.exports = {
  createUsuario,
  getUsuarios,
  editarUsuario,
  eliminarUsuario,
};