const { body } = require("express-validator");
const multer = require("multer");
const { extname } = require("path");
const Pizza = require("../models/Pizza");

const cargarImagen = multer({
  storage: multer.diskStorage({
    destination: "public/images/pizzas",
    filename: async (req, file, cb) => {
      const extension = extname(file.originalname);
      const name = file.originalname.split(extension)[0];
      cb(null, `${name}-${Date.now()}${extension}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("solo acepta formato jpg y png"));
  },
}).single("imagen");

const validaNombre = async (nombre) => {
  const pizza = await Pizza.findOne({ nombre });

  if (pizza) throw new Error("pizza existente");

  return true;
};

const validaNegativo = async (numero) => {
  if (numero > 0) {
    return true;
  }
  throw new Error("la cantidad no debe ser negativa o cero");
};

const validarCrearPizza = [
	body("nombre").exists().withMessage("Nombre es requerido").bail()
    .isString().withMessage("Ingresa un nombre valido").bail()
		.custom(validaNombre),
	body("ingredientes").exists().withMessage("ingredientes es requerido").bail()
    .isString().withMessage("Ingresa ingredientes validos"),
	body("cantidad").exists().withMessage("cantidad es requerido").bail()
		.isNumeric().withMessage("Ingresa un monto valido").bail()
		.custom(validaNegativo),
	body("familiar").exists().withMessage("precio de familiar es requerido").bail()
		.isNumeric().withMessage("Ingrese un precio de familiar valido").bail()
		.custom(validaNegativo),
	body("mediana").exists().withMessage("precio de mediana es requerido").bail()
		.isNumeric().withMessage("Ingrese un precio de mediana valido").bail()
		.custom(validaNegativo),
	body("pequena").exists().withMessage("precio de pequeña es requerido").bail()
		.isNumeric().withMessage("Ingrese un precio de pequeña valido").bail()
		.custom(validaNegativo),
	body("porcion").exists().withMessage("precio de porcion es requerido").bail()
		.isNumeric().withMessage("Ingrese un precio de porcion valido").bail()
		.custom(validaNegativo)
]

const validarEditarPizza = [
	body("nombre").optional().bail()
    .isString().withMessage("Ingresa un nombre valido").bail()
		.custom(async (nombre, { req }) => {
			const pizza = await Pizza.findOne({nombre});
			const pizzaEditada = await Pizza.findById(req.params.id);
			
			if(pizza && pizzaEditada.nombre !== nombre) throw new Error('nombre existente');
			return true;
		}),
  body("ingredientes").optional().bail()
		.isString().withMessage("Ingresa ingredientes validos"),
	body("cantidad").optional().bail()
		.isNumeric().withMessage("Ingresa un monto valido").bail()
		.custom(validaNegativo),
	body("familiar").optional().bail()
		.isNumeric().withMessage("Ingresa un monto familiar valido").bail()
		.custom(validaNegativo),
	body("grande").optional().bail()
		.isNumeric().withMessage("Ingresa un monto grande valido").bail()
		.custom(validaNegativo),
	body("pequena").optional().bail()
		.isNumeric().withMessage("Ingresa un monto pequena valido").bail()
		.custom(validaNegativo),
	body("porcion").optional().bail()
		.isNumeric().withMessage("Ingresa un monto porcion valido").bail()
		.custom(validaNegativo),
]
module.exports = {
	validarCrearPizza,
	validarEditarPizza,
	cargarImagen,
}