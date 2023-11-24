const { Router } = require("express");
const { mostrarPizzas, mostrarPizza, buscarPizza, crearPizza } = require("../controllers/pizzas.controller");
const { validarCrearPizza, cargarImagen } = require("../middlewares/pizzas.middlewares");
const { auth } = require("../middlewares/usuarios.middlewares");


const router = Router();

router.get("/", mostrarPizzas);
router.get("/:id", mostrarPizza);
router.get("/buscar/:nombre", buscarPizza);
router.post("/", [cargarImagen, auth, validarCrearPizza], crearPizza);

module.exports = router;