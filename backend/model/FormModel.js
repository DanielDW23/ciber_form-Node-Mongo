import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import escape from "validator/lib/escape.js";

const FormLockSchema = new mongoose.Schema({
  email: { 
    type: String,
    required  : [ true, 'El correo es obligatorio' ], 
    validate: [ isEmail, 'Email invalido' ],
    maxlength : [ 100, 'El email no puede exceder los 100 caracteres'],
    set: v => escape(v)
     },
  name: {
     type: String,
     required  : [ true, 'El nombre es obligatorio' ],
     maxlength : [ 80, 'El nombre no puede exceder los 80 caracteres'],
     set: v => escape(v)
    },
  subject: {
     type: String,
     required  : [ true, 'El asunto es obligatorio' ],
     maxlength : [ 120, 'El asunto no puede exceder los 120 caracteres'],
     set: v => escape(v)
     },
  message: {
     type: String,
     required  : [ true, 'El mensaje es obligatorio' ],
     maxlength : [ 400, 'El nombre no puede exceder los 600 caracteres'],
     set: v => escape(v)
     }
});

const FormLock = mongoose.model("Form", FormLockSchema);

export default FormLock;
