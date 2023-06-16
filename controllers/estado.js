const Estado = require("../models/Estado");
const { request, response } = require("express");
const { validarJWT, validarRolAdmin } = require("../middleware/validar-jwt");
const createEstado = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const nombre = (req.body.nombre || "").toUpperCase();
    const estadoDB = await Estado.findOne({ nombre });

    if (estadoDB) return res.status(400).json({ msg: "Ya existe" });

    const estado = await Estado.create({ nombre });
    return res.status(201).json(estado);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];
const getEstados = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const estadosDB = await Estado.find({ estado });
    return res.json(estadosDB);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];
const editarEstado = [validarJWT, validarRolAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const estados = await Estado.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
}];
const eliminarEstado = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  const { id } = req.params;
  Estado.findByIdAndDelete(id).then(result => { res.json(result) });
}];

module.exports = { createEstado, getEstados, editarEstado, eliminarEstado };


