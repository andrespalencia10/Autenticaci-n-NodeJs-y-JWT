const { Router } = require("express");
const {
  createEstado,
  getEstados,
  editarEstado,
  eliminarEstado,
} = require("../controllers/estado");

const router = Router();

//Crear
router.post("/", createEstado);

//Listar
router.get("/", getEstados);

//Editar
router.put("/:id", editarEstado);

//Eliminar
router.delete("/:id", eliminarEstado);

module.exports = router;
