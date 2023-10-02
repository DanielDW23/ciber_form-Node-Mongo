import jwt from "jsonwebtoken";
import moment from "moment";
import "dotenv/config";

//definir clave secreta

if (!process.env.SECRET_KEY_TOKEN) {
  throw new Error("SECRET_KEY_TOKEN no está definido en el fichero .env ");
}

export const secret_value = process.env.SECRET_KEY_TOKEN;

//crear función para generar tokens

export const createToken = (user) => {
  const payload = {
    id: user._id,
    nick: user.nick,
    role: user.role,
    name: user.name,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  //devolver jwt token codificado

  const jwttoken = jwt.sign(payload, secret_value);
  return jwttoken;
};
