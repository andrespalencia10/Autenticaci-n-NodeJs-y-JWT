const Inventario = require("../models/inventario");
const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const Marca = require("../models/marca");
const Estado = require("../models/Estado");
const TipoEquipo = require("../models/tipoEquipo");
const { validarJWT, validarRolAdmin } = require("../middleware/validar-jwt");

const createInventario = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  try {
    const { usuario, marca, estado, tipoEquipo, ...data } = req.body;

    const [usuarioDB, marcaDB, estadoDB, tipoEquipoDB] = await Promise.all([
      Usuario.findOne({ _id: usuario._id, estado: true }),
      Marca.findOne({ _id: marca._id, estado: true }),
      Estado.findOne({ _id: estado._id, estado: true }),
      TipoEquipo.findOne({ _id: tipoEquipo._id, estado: true })
    ]);

    if (!usuarioDB) return res.status(400).json({ msg: "usuario invalido" });
    if (!marcaDB) return res.status(400).json({ msg: "marca invalida" });
    if (!estadoDB) return res.status(400).json({ msg: "estado invalido" });
    if (!tipoEquipoDB) return res.status(400).json({ msg: "Tipo de Equipo invalido" });

    const inventario = await Inventario.create({ usuario, marca, estado, tipoEquipo, ...data });
    return res.status(201).json(inventario);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const getInventarios = [validarJWT, async (req = request, res = response) => {
  try {
    const inventariosDB = await Inventario.find({})
      .populate({ path: "usuario", match: { estado: true } })
      .populate({ path: "marca", match: { estado: true } })
      .populate({ path: "estado", match: { estado: true } })
      .populate({ path: "tipoEquipo", match: { estado: true } });

    return res.json(inventariosDB);
  } catch (e) {
    return res.status(500).json({ msg: "Error general " + e });
  }
}];

const editarInventario = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  const { id } = req.params;
  const { usuario, marca, estado, tipoEquipo, ...inventario } = req.body;
  const nuevo = { usuario, marca, estado, tipoEquipo, ...inventario };
  Inventario.findByIdAndUpdate(id, nuevo, { new: true }).then((result) => {
    res.json(result);
  });
}];

const eliminarInventario = [validarJWT, validarRolAdmin, async (req = request, res = response) => {
  const { id } = req.params;
  Inventario.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
}];

module.exports = { createInventario, getInventarios, editarInventario, eliminarInventario };
