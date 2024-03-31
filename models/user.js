const { Schema, Model } = require("firefose");
const { SchemaTypes } = require("firefose");
const { String, Number, Array, Boolean } = SchemaTypes;
const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  nivelEducacion: {
    type: String,
    required: [true, "El nivel de educacion es obligatorio"],
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = new Model("Usuarios", UsuarioSchema);
