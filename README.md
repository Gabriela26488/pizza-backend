# "Pizza" Backend.

## Instalación

Debe de descargar el sistema y dentro de la carpeta de este ejecutar el comando npm install.

```bash
  npm install
```

Luego debe modificar el archivo .env para configurar el puerto y la base de datos MongoDB si va atrabajar con una base de datos distinta o diferente puerto

```javascript
PORT = 3000
MONGO_DB = direccion_de_la_bd_en_MONGO_DB
```

Para arrancar el sistema se debe ejecutar en la consola el comando:
```bash
  npm start
```

## Endpoints
### POST - /api/auth/singin
Devuelve los datos del usuario que se esta registrando
### POST - /api/auth/login
Devuele el token del usuario que esta iniciado sesion
### GET - /api/pizzas
Devuelve la lista de pizzas almacenadas en la BD
### GET - /api/pizzas/:id
Devuelve una pizza en especifico a traves de la ID
### GET - /api/pizzas/buscar/:nombre
Busca una pizza a traves del nombre y la devuelve como respuesta
### POST - /api/pizzas/
Endpoint que se utiliza para agregar una pizza al servidor
### PUT - /api/pizzas/:id
Se utiliza para editar los datos de una pizza en especifico a traves de la ID, la id se envia a traves de la url
### PUT - /api/pizzas/imagen/:id
Se utiliza para cambiar la imagen de una pizza a traves de su id
### DELETE - /api/pizzas/:id
Se utiliza para eliminar una pizza en especifico a traves de la ID, la id se envia a traves de la url.
### GET - /api/usuaios
Devuelve la lista de usuarios almacenados en la BD
### GET - /api/usuaios/verificar/usuario
Devuelve los datos del usuario que esta con la sesion activa
### GET - /api/usuaios/:id
Devuelve un usuario en especifico a traves de la ID
### POST - /api/usuarios/
Endpoint que se utiliza para agregar un usuario al servidor
### PUT - /api/usuarios/:id
Se utiliza para editar los datos de un usuario en especifico a traves de la ID, la id se envia a traves de la url
### PUT - /api/usuarios/cargarImagen/:id
Se utiliza para cambiar la imagen de un usuario a traves de su id
### DELETE - /api/usuarios/:id
Se utiliza para eliminar un usuario en especifico a traves de la ID, la id se envia a traves de la url.
