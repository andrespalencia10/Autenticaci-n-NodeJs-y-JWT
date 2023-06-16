const { Router } = require("express");
const {
  createTipoEquipo,
  getTipoEquipos,
  editarTipoEquipo,
  eliminarEquipo,
} = require("../controllers/tipoEquipo");

const router = Router();

//Crear
router.post("/", createTipoEquipo);

//Listar
router.get("/", getTipoEquipos);

// Editar
router.put("/:id", editarTipoEquipo);

//Eliminar
router.delete("/:id", eliminarEquipo);

module.exports = router;
