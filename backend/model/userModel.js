import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    rol: String,
    nick: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;