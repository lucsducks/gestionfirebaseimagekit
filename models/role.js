const { Schema, Model } = require("firefose");
const { SchemaTypes } = require("firefose");
const { String, Number, Array, Boolean } = SchemaTypes;
const RoleSchema = new Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  }
});

module.exports = new Model("Roles", RoleSchema);
