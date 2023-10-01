// importar modulos
import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/userModel.js';


// importar clave secreta
import { secret_value } from '../libs/jwt.js';
const secret = secret_value;

// Funcion de autenticacion
export const authRole = (role) => {
  return (req, res, next) => {
  // Comprobar si me llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(401).send({
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
        return res.status(401).send({
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
      if (payload.role !== role) {
        return res.status(403).send({
          status: "error",
          message:
            `Acceso no autorizado para usuarios que no son ${role}`,
        });
      
      }

      User.findById(payload._id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).send({
                status: "error",
                message: "Error al buscar el usuario",
            });
        }

        if (user.role !== role) {
            return res.status(403).send({
                status: "error",
                message: "Acceso no autorizado",
            });
        }

      
      // Si todo está bien, puedes asignar los datos de usuario al objeto 'req' si lo necesitas
        req.user = payload;

      // Continuar con la solicitud
        next();

    });

  });
    
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "Error al verificar el token",
    });
  }
}};