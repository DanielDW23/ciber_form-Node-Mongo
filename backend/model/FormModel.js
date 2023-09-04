import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const FormLockSchema = new mongoose.Schema({
  Email: { 
    type: String,
    required  : [ true, 'El correo es obligatorio' ], 
    validate: [ isEmail, 'Email invalido' ]
     },
  Name: {
     type: String,
     required  : [ true, 'El nombre es obligatorio' ],
     maxlength : [ 50, 'El nombre no puede exceder los 50 caracteres'],
     minlength : [ 3, 'El nombre debe contener 3 o más caracteres'] 
    },
  Subject: {
     type: String,
     required  : [ true, 'El asunto es obligatorio' ],
     maxlength : [ 150, 'El asunto no puede exceder los 150 caracteres'],
     minlength : [ 6, 'El asunto debe contener 3 o más caracteres'] 
     },
  Message: {
     type: String,
     required  : [ true, 'El mensaje es obligatorio' ],
     maxlength : [ 600, 'El nombre no puede exceder los 600 caracteres'],
     minlength : [ 6, 'El nombre debe contener 3 o más caracteres'] 
     }
});

const FormLock = mongoose.model("Form", FormLockSchema);

export default FormLock;
