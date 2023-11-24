const { validationResult } = require("express-validator");
const objId = require("mongoose").Types.ObjectId;
const fs = require("fs").promises;

const Pizza = require("../models/Pizza");
const ac = require("../middlewares/roles");
const { resizeImg } = require("../middlewares/usuarios.middlewares");

const validarDatos = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { errors: errors.array() };
  } else return null;
};

const validarId = (id) => {
  if (!objId.isValid(id)) {
    return false;
  }
  return true;
};

const mostrarPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const mostrarPizza = async (req, res) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({ msg: "el id ingresado no es invalido" });
    }

    const verificaExistencia = await Pizza.findById(req.params.id);

    if (!verificaExistencia) {
      return res
        .status(400)
        .json({ msg: "la pizza no se encuentra registrada" });
    }

    res.status(200).json(verificaExistencia);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const buscarPizza = async (req, res) => {
  try {
    const buscar = new RegExp(req.params.nombre, "i");

    const busqueda = await Pizza.find({ nombre: buscar }).exec();
    res.status(200).json(busqueda);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const crearPizza = async (req, res) => {
  try {
    if (!ac.can(req.user.rol).createAny("pizza").granted)
      return res.status(401).json("Unauthorized");

    const validar = validarDatos(req);
    if (validar) {
      await fs.unlink(`./${req.file.destination}/${req.file.filename}`);
      return res.status(400).json(validar);
    }

    const imagen = req.file;

    const imagenResize = resizeImg(imagen.path, imagen.filename, 600, 600, "pizzas");

    req.body.imagen = imagenResize;

    const nuevaPizza = new Pizza(req.body);
    await nuevaPizza.save();

    res.status(201).json(nuevaPizza);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
    mostrarPizzas,
    mostrarPizza,
    buscarPizza,
    crearPizza
}