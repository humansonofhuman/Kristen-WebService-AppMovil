'use strict';

module.exports = function (Horario) {
  var server = require('../../server/server');

  Horario.horario = function (matriculaAlumno, cb) {
    var filtro = {
      where: {
        matricula: matriculaAlumno
      }
    };
    var horarioFormateado = {
      Lunes: [],
      Martes: [],
      Miercoles: [],
      Jueves: [],
      Viernes: []
    };
    // horarioFormateado.Lunes.push({
    //     acronimo: "DAMA",
    //     hora: "7:50-10:30",
    //     profesor: "Dr Mariano Xiu Chan",
    //     nombre: ""
    // });
    Horario.find(filtro, function (err, horario) {
      if (err) return cb(err);
      if (typeof horario === 'undefined' || horario.length < 1) {
        console.log('No hay horario');
        var error = new Error('No hay horario con esa matricula');
        error.status = 404;
        cb(error);
        return;
      }
      horario.forEach(element => {
        var materia = {};
        materia.acronimo = element.clave_mat;
        materia['nombre'] = element.nombre_mat;
        materia.profesor = element.profesor;
        if (element.lunes !== '') {
          materia = Object.assign({}, materia);
          materia.hora = formatearHora(element.lunes);
          console.log(materia.hora);
          horarioFormateado.Lunes.push(materia);
        }
        if (element.martes !== '') {
          materia = Object.assign({}, materia);
          materia.hora = formatearHora(element.martes);
          console.log(materia.hora);
          horarioFormateado.Martes.push(materia);
        }
        if (element.miercoles !== '') {
          materia = Object.assign({}, materia);
          materia.hora = formatearHora(element.miercoles);
          console.log(materia.hora);
          horarioFormateado.Miercoles.push(materia);
        }
        if (element.jueves !== '') {
          materia = Object.assign({}, materia);
          materia.hora = formatearHora(element.jueves);
          console.log(materia.hora);
          horarioFormateado.Jueves.push(materia);
        }
        if (element.viernes !== '') {
          materia = Object.assign({}, materia);
          materia.hora = formatearHora(element.viernes);
          console.log(materia.hora);
          horarioFormateado.Viernes.push(materia);
        }
      });
      console.log(horarioFormateado);
      // Ordena los horarios en base de la key hora
      horarioFormateado.Lunes = horarioFormateado.Lunes.sort(predicateBy('hora'));
      horarioFormateado.Martes = horarioFormateado.Martes.sort(predicateBy('hora'));
      horarioFormateado.Miercoles = horarioFormateado.Miercoles.sort(predicateBy('hora'));
      horarioFormateado.Jueves = horarioFormateado.Jueves.sort(predicateBy('hora'));
      horarioFormateado.Viernes = horarioFormateado.Viernes.sort(predicateBy('hora'));
      cb(null, horarioFormateado);
      return;
    });
  };
  /**
   * Recibe una cadena de ocho caracteres 08401030
   * @param {String} hora
   * @returns {String} Devuelve una cadena formateada 08:40-10:30
   */
  function formatearHora(hora) {
    return hora.slice(0, 2) + ':' + hora.slice(2, 4) + '-' + hora.slice(4, 6) + ':' + hora.slice(6, 8);
  }

  function predicateBy(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  // INCIA - REMOTE HOOKS
  Horario.beforeRemote('*', function logQuery(ctx, modelInstance, next) {
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
