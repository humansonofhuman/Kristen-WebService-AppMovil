'use strict';

module.exports = function (Alumnos) {
  const TOPIC_GENERAL = 'GENERAL';
  const URL_BASE = 'new.upqroo.edu.mx/'; // Debe llevar la / al final
  const URL_API = 'kristen-mongodb.glitch.me/';
  var server = require('../../server/server');

  Alumnos.login = function (credenciales, cb) {
    var filtro = {
      where: {
        and: [
          {
            matricula: credenciales.matricula
          },
          {
            contrasena: credenciales.contrasena
          }
        ]
      }
    };
    Alumnos.find(filtro, function (err, alumno) {
      if (err) return cb(err);
      if (typeof alumno === 'undefined' || alumno.length < 1) {
        console.log('No hay alumno');
        var error = new Error('No hay alumno con esas credenciales ');
        error.status = 404;
        cb(error);
        return;
      }
      var carreras = Alumnos.app.models.Carreras;
      carreras.find({
        where: {
          idCarreras: alumno[0].carrera
        }
      }, function (err, carrera) {
        if (err) return cb(err);
        if (typeof carrera === 'undefined' || carrera.length < 1)
          return console.log('Carrera no existe: ', alumno[0].carrera);
        var nombre = carrera[0].nombre;
        // Agrega el nombre de la carrera, como campo adicional
        alumno[0].nombre_carrera = nombre;
        // El topic es para la suscripcion a las notificaciones en firebase
        alumno[0].situacion = nombreEstadoVigencia(alumno[0].situacion);
        var config = {
          'url_api': URL_API,
          'url_base': URL_BASE,
          'token': server.TOKEN,
          'topic_general': TOPIC_GENERAL,
          'topic': formatoGrupoObjetivo(nombre)
        };
        alumno[0].config = config;
        cb(null, alumno[0]);
        return;
      });
    });
  };
  /**
   * Le da el formato necesario para identificar el grupo objetivo a una cadena
   * Quita los acentos, tildes y otros de una cadena y la ñ,
   * y el espacio en blanco
   * @param {string} cadena cadena a la que se le van a quitar los acentos
   * @returns {string} Cadena formateada en mayusculas
   */
  function formatoGrupoObjetivo(cadena) {
    cadena = cadena.toLowerCase();
    cadena = cadena.replace(new RegExp(/\s/g), '');
    cadena = cadena.replace(new RegExp(/[àáâãäå]/g), 'a');
    cadena = cadena.replace(new RegExp(/[èéêë]/g), 'e');
    cadena = cadena.replace(new RegExp(/[ìíîï]/g), 'i');
    cadena = cadena.replace(new RegExp(/ñ/g), 'n');
    cadena = cadena.replace(new RegExp(/[òóôõö]/g), 'o');
    cadena = cadena.replace(new RegExp(/[ùúûü]/g), 'u');
    cadena = cadena.toUpperCase();
    return cadena;
  };
  /**
   * Devuelve el nombre en string del estado de vigencia, dado un numero
   * @param {string} id id del estado de vigencia
   * @return {string} Cadena con el nombre del estado de vigencia
   */
  function nombreEstadoVigencia(id) {
    switch (id) {
      case '0': return 'Baja';
      case '1': return 'Vigente';
      case '2': return 'Baja Temporal';
      case '4': return 'Baja Definitiva';
      case '5': return 'Egresado';
    }
  };
};
