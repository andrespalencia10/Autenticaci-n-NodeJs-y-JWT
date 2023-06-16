const TipoEquipo = require("../models/tipoEquipo");
const { request, response } = require("express");
const { validarJWT, validarRolAdmin } = require("../middleware/validar-jwt");

const createTipoEquipo = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const tipoEquipoDB = await TipoEquipo.findOne({ nombre: nombre.toUpperCase() });

    if (tipoEquipoDB) return res.status(400).json({ msg: "Ya existe" });

    const tipoEquipo = await TipoEquipo.create({ nombre });
    return res.status(201).json(tipoEquipo);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const getTipoEquipos = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {   
    const tipoEquiposDB = await TipoEquipo.find(); 
    return res.json(tipoEquiposDB);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const editarTipoEquipo = [validarJWT, validarRolAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    res.json(tipoEquipo);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
}];

const eliminarEquipo = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  const { id } = req.params;
  TipoEquipo.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
}];

module.exports = {
  createTipoEquipo,
  getTipoEquipos,
  editarTipoEquipo,
  eliminarEquipo,
};