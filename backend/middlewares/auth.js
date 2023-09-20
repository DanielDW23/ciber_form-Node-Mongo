// importar modulos
const jwt = require("jsonwebtoken");
const moment = require("moment");

// importar clave secreta
const libjwt = require("../libs/jwt");
const secret = libjwt.secret;

// Funcion de autenticacion
exports.authAdmin = (req, res, next) => {
  // Comprobar si me llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La petición no tiene la cabecera de autenticación",
    });
  }

  // Limpiar token de comillas con expresión regular
  let token = req.headers.authorization.replace(/['"]+/g, "");

  // Verificar firma del token y descodificar el token
  try {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: "Token inválido",
        });
      }

      // Verificar expiración del token
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({
          status: "error",
          message: "Token expirado",
        });
      }

      // Verificar el campo 'role' en el payload
      if (payload.role !== "admin") {
        return res.status(403).send({
          status: "error",
          message:
            "Acceso no autorizado para usuarios que no son administradores",
        });
      }

      // Si todo está bien, puedes asignar los datos de usuario al objeto 'req' si lo necesitas
      req.user = payload;

      // Continuar con la solicitud
      next();
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al verificar el token",
    });
  }
};