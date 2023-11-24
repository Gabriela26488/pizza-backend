const { body } = require('express-validator');
const passport = require('passport');
const Usuario = require('../models/Usuario');


// funciones para usarlas en los middlewares de validacion
// funcion para saber si ya se encuentra registrado un correo
const encuentraCorreo = async (correo) => {
    const usuario = await Usuario.findOne({correo});

    if(usuario) throw new Error('correo existente');

    return true;
 }

// funcion que verifica si el rol es correcto
const verificarRol = (rol) => {
	if (rol === 'admin' ||
        rol === 'cajero' ||
		rol === 'usuario' ) {
		return true;
	}
	throw new Error('el rol es incorrecto');
}

// middlewares que valida los datos enviados a la ruta
const validarCrearCuenta = [
	body('correo')
		.exists().withMessage('Correo es requerido').bail()
		.isEmail().withMessage('Ingresa un correo valido').bail()
		.custom(encuentraCorreo),

	body('password')
		.exists().withMessage('Password es requerido').bail()
		.isString().withMessage('Ingrese un password valido').bail()
		.isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
  body('nombres')
		.exists().withMessage('Nombre es requerido').bail()
		.isString().withMessage('Ingresa un nombre valido').bail()
		.matches("^([\Na-zA-ZáéíóúÁÉÍÓÚñÑ' ]+)$").withMessage('los nombres solo deben de tener letras'),  
]

const validarEditarCuenta = [
	body('correo')
		.optional().bail()
		.isEmail().withMessage('Ingresa un correo valido').bail()
		.custom(async (correo, { req }) => {
			const usuario = await Usuario.findOne({correo});
			const usuarioEditado = await Usuario.findById(req.params.id);
			
			if(usuario && usuarioEditado.correo !== correo) throw new Error('correo existente');

			return true;
		}),
    
	body('password')
		.optional().bail()
		.isString().withMessage('Ingrese un password valido').bail()
		.isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
    body('nombres')
		.optional().bail()
		.isString().withMessage('Ingresa un nombre valido').bail()
        .matches("^([\Na-zA-ZáéíóúÁÉÍÓÚñÑ' ]+)$").withMessage('los nombres solo deben de tener letras'),
                    	
	body('rol')
		.optional().bail()
		.isString().withMessage('Ingresa un rol valido').bail()
		.custom(verificarRol),
	
	body('telefono')
		.optional().bail()
		.isString().withMessage('El telefono debe ser string').bail()
		.matches("^[0-9]{11}$").withMessage('el telefono solo debe tener numeros y un tamaño de 11 caracteres').bail(),
    body('direccion')
		.optional().bail()
		.isString().withMessage('Ingresa una direccion valida'),
]



// funcion para saber si el token es valido
const auth = passport.authenticate('jwt', {session: false});

module.exports = {
	validarCrearCuenta,
    validarEditarCuenta,
	auth
}