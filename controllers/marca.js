const Marca = require("../models/marca");
const { request, response } = require("express");
const { validarJWT, validarRolAdmin } = require("../middleware/validar-jwt");

const createMarca = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const marcaDB = await Marca.findOne({ nombre: nombre.toUpperCase() });

    if (marcaDB) return res.status(400).json({ msg: "Ya existe" });

    const marca = await Marca.create({ nombre });
    return res.status(201).json(marca);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const getMarcas = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const marcasDB = await Marca.find({ estado });
    return res.json(marcasDB);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const editarMarca = [validarJWT, validarRolAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const marca = await Marca.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
}];

const eliminarMarca = [validarJWT, validarRolAdmin, async (req, res = response) => {
  const { id } = req.params;
  Marca.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
}];

module.exports = { createMarca, getMarcas, editarMarca, eliminarMarca };