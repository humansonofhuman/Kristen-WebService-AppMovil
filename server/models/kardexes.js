'use strict';

module.exports = function (Kardexes) {
  var server = require('../../server/server');

  Kardexes.Kardexes = function (alumnoMatricula, cb) {
    var filtro = {
      where: {
        matricula: alumnoMatricula
      }
    };
    Kardexes.find(filtro, function (err, Kardexes) {
      if (err) return cb(err);
      if (typeof Kardexes === 'undefined' || Kardexes.length < 1) {
        console.log('No existe el kardex de este alumno');
        var error = new Error('No existe kardex de este alumno');
        error.status = 404;
        cb(error);
        return;
      }
      cb(null, Kardexes);
      return;
    });
  };
  // INCIA - REMOTE HOOKS
  Kardexes.beforeRemote('*', function logQuery(ctx, modelInstance, next) {
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
