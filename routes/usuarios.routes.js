const { Router } = require("express");
const {
  auth,
  validarCrearCuenta,
  validarEditarCuenta,
  cargarImagen,
} = require("../middlewares/usuarios.middlewares");
const {
  mostrarUsuarios,
  mostrarUnUsuario,
  crearUsuario,
  eliminarUsuario,
  editarUsuario,
  verificarLogin,
  imagenUsuario
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", auth, mostrarUsuarios);
router.get("/:id", auth, mostrarUnUsuario);
router.post("/", [auth, validarCrearCuenta], crearUsuario);
router.delete("/:id", auth, eliminarUsuario);
router.put("/:id", [auth, validarEditarCuenta], editarUsuario);
router.get("/verificar/usuario", auth, verificarLogin);

router.put("/cargarImagen/:id", [cargarImagen, auth], imagenUsuario)

module.exports = router;
