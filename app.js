const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

const tipoEquipo = require("./routes/tipoEquipo");
const estado = require("./routes/estado");
const usuario = require("./routes/usuario");
const marca = require("./routes/marca");
const inventario = require("./routes/inventario");
const auth = require("./routes/auth");

// middlewares
app.use("/api/tiposequipos", tipoEquipo);
app.use("/api/estados", estado);
app.use("/api/usuarios", usuario);
app.use("/api/marcas", marca);
app.use("/api/inventarios", inventario);
app.use("/api/auth", auth);

module.exports = app;
