import User from "../models/userModel.js";
import { createToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    let errorMessages = {};
    for (let key in error.errors) {
      errorMessages[key] = error.errors[key].message;
    }
    return res.status(400).json({ errors: errorMessages });
  }
};

export const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ error: "Usuario no encontrado!" });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "surname", "nick", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res
      .status(400)
      .send({
        error: "Los campos de actualización proporcionados no son válidos!",
      });

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ error: "Usuario no encontrado!" });

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res
      .status(400)
      .send({
        error: "Error al actualizar el usuario!",
        detalle: error.message,
      });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Busca al usuario por su nombre de usuario
    const user = await User.findOne({ email });

    // Verifica si el usuario existe y si la contraseña es válida
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Mensaje genérico para evitar dar información sensible
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Genera un token JWT para la autenticación
    const newtoken = createToken(user);

    // Envia el token al cliente
    return res.status(200).json({ token: newtoken });
  } catch (error) {
    // Maneja los errores
    console.error(error); // Log del error para poder depurarlo
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
