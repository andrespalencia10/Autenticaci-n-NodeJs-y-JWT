const { Router } = require("express");
const {
  createMarca,
  getMarcas,
  editarMarca,
  eliminarMarca,
} = require("../controllers/marca");

const router = Router();

//Crear
router.post("/", createMarca);

//Listar
router.get("/", getMarcas);

//Editar
router.put("/:id", editarMarca);

//Eliminar
router.delete("/:id", eliminarMarca);

module.exports = router;
