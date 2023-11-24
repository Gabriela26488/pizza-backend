const { AccessControl } = require('accesscontrol');

const ac = new AccessControl();
//  creacion de los permisos que tiene cada rol
ac.grant('usuario')
    .updateOwn('usuario')
    .readOwn('usuario')
  .grant('cajero')
    .extend('usuario')
  .grant('admin')
    .extend('cajero')
    .createAny('usuario')
    .readAny('usuario')
    .updateAny('usuario')
    .deleteAny('usuario')
    .createAny('pizza')
    .readAny('pizza')
    .updateAny('pizza')
    .deleteAny('pizza')


module.exports = ac;