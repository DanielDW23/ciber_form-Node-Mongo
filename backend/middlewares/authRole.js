// importar módulos
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/userModel.js";

// importar clave secreta
import { secret_value } from "../libs/jwt.js";
const secret = secret_value;

// Función de autenticación
export const authRole = (role) => {
  return async (req, res, next) => {
    // <-- Nota el uso de async aquí
    // Comprobar si me llega la cabecera de auth
    if (!req.headers.authorization) {
      return res.status(401).send({
        status: "error",
        message: "La petición no tiene la cabecera de autenticación",
      });
    }

    // Limpiar token de comillas con expresión regular
    let token = req.headers.authorization.replace(/Bearer\s+|['"]+/g, "");

    // Verificar firma del token y descodificar el token
    try {
      const payload = jwt.verify(token, secret); // <-- Nota el cambio aquí

      // Verificar expiración del token
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({
          status: "error",
          message: "Token expirado",
        });
      }

      // Verificar el campo 'role' en el payload
      if (payload.role !== role) {
        return res.status(403).send({
          status: "error",
          message: `Acceso no autorizado para usuarios que no son ${role}`,
        });
      }

      // Intentar encontrar el usuario en la base de datos

      try {
        const user = await User.findById(payload.id).exec(); // <-- Nota el cambio aquí

        if (!user || user.role !== role) {
          return res.status(403).send({
            status: "error",
            message: "Acceso no autorizado",
          });
        }

        // Si todo está bien, puedes asignar los datos de usuario al objeto 'req' si lo necesitas
        req.user = payload;

        // Continuar con la solicitud
        next();
      } catch (err) {
        // Error al buscar el usuario
        return res.status(400).send({
          status: "error",
          message: "Error al buscar el usuario",
        });
      }
    } catch (err) {
      // Token inválido o error al verificar el token
      return res.status(401).send({
        status: "error",
        message: "Token inválido",
      });
    }
  };
};
