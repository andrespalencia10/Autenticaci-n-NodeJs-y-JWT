const { Router } = require("express");
const {
  createInventario,
  getInventarios,
  editarInventario,
  eliminarInventario,
} = require("../controllers/inventario");

const router = Router();

//Crear
router.post("/", createInventario);

//Listar
router.get("/", getInventarios);

//Editar
router.put("/:id", editarInventario);

//Eliminar
router.delete("/:id", eliminarInventario);

module.exports = router;
