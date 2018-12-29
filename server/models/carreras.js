'use strict';

module.exports = function (Carreras) {
  var server = require('../../server/server');

  Carreras.disableRemoteMethodByName('patchOrCreate', true);
  Carreras.disableRemoteMethodByName('replaceOrCreate', true);
  Carreras.disableRemoteMethodByName('create', true);
  Carreras.disableRemoteMethodByName('prototype.patchAttributes', true);
  Carreras.disableRemoteMethodByName('replaceById', true);
  Carreras.disableRemoteMethodByName('deleteById', true);
  Carreras.disableRemoteMethodByName('replaceById', true);
  Carreras.disableRemoteMethodByName('createChangeStream', true);
  Carreras.disableRemoteMethodByName('replaceOrCreate', true);
  Carreras.disableRemoteMethodByName('updateAll', true);
  Carreras.disableRemoteMethodByName('upsertWithWhere', true);

  // INCIA - REMOTE HOOKS
  Carreras.beforeRemote('*', function logQuery(ctx, modelInstance, next) {
    // console.log('Token:', ctx.req.query.access_token);
    // Si el Token es invalido no realiza el proceso y rechaza la petición
    if (typeof ctx.req.query.access_token === 'undefined' ||
    ctx.req.query.access_token !== server.TOKEN) {
      console.log('Token de acceso inválido %s', ctx.req.query.access_token);
      ctx.res.sendStatus(403);
    } else {
      next();
    }
  });
  // TERMINA - REMOTE HOOKS
};
