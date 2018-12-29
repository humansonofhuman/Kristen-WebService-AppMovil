'use strict';

module.exports = function (Calificaciones) {
  var server = require('../../server/server');

  Calificaciones.calificaciones = function (alumnoMatricula, cb) {
    var filtro = {
      where: {
        matricula: alumnoMatricula
      }
    };
    Calificaciones.find(filtro, function (err, calificaciones) {
      if (err) return cb(err);
      if (typeof calificaciones === 'undefined' || calificaciones.length < 1) {
        console.log('No existen calificaciones para este alumno');
        var error = new Error('No existen calificaciones para este alumno');
        error.status = 404;
        cb(error);
        return;
      }
      cb(null, calificaciones);
      return;
    });
  };
  // INCIA - REMOTE HOOKS
  Calificaciones.beforeRemote('*', function logQuery(ctx, modelInstance, next) {
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
