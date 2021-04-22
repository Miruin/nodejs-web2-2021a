const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
    usuario: String,
    nombre: String,
    apellido: String,
    pw: String,
    correo: String,
    telf: String
});

userSchema.methods.encryptpw = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparepw = function (password) {
  return bcrypt.compareSync(password, this.pw);
};

module.exports = mongoose.model('user', userSchema);