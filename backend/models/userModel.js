import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      trim: true
    },
    nick: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
      trim: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: props => `${props.value} no es un email válido!`
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/.test(password);
        },
        message: props =>
          `${props.value} no cumple con los requisitos de seguridad: debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.`,
    },
  },
    role: {
        type: String,
        default: 'user'
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Aplicar uniqueValidator plugin a userSchema.
userSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} {VALUE} ya existe.' });

userSchema.pre('save', async function (next) {
  // Solo encriptar la contraseña si ha sido modificada o es nueva
  if (!this.isModified('password')) return next();

  try {
      // Encriptar la contraseña usando bcrypt
      const salt = await bcrypt.genSalt(10); // 10 es el número de rondas de salting
      this.password = await bcrypt.hash(this.password, salt);
      next();
  } catch (err) {
      next(err); // Si ocurre un error durante el hash, pasa al manejador de errores
  }
});


export default mongoose.model("User", userSchema);