const { Router } = require("express");
const { mostrarPizzas, mostrarPizza, buscarPizza, crearPizza, editarDatosPizza, eliminarPizza, editarImagen } = require("../controllers/pizzas.controller");
const { validarCrearPizza, cargarImagen, validarEditarPizza } = require("../middlewares/pizzas.middlewares");
const { auth } = require("../middlewares/usuarios.middlewares");


const router = Router();

router.get("/", mostrarPizzas);
router.get("/:id", mostrarPizza);
router.get("/buscar/:nombre", buscarPizza);
router.post("/", [cargarImagen, auth, validarCrearPizza], crearPizza);
router.put("/:id", [auth, validarEditarPizza], editarDatosPizza);
router.put("/imagen/:id", [cargarImagen, auth], editarImagen);
router.delete("/:id", auth, eliminarPizza);

module.exports = router;