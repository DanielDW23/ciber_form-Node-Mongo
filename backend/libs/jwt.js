const jwt = require('jsonwebtoken');

// const jwt = require("jwt-simple");

const moment = require("moment");
import 'dotenv/config';
//definir clave secreta

const secret = process.env.SECRET_KEY_TOKEN;

//crear funcion para generar tokens

const createToken = async (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  //devolver jwt token codificado
  console.log(user.role);
  const jwttoken = await jwt.encode(payload, secret);
  return jwttoken;
};

module.exports = {
  secret,
  createToken,
};