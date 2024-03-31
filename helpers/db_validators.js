const Role = require("../models/role");
const Usuario = require("../models/user");
const { Query } = require("firefose"); 

const esRoleValido = async (rol = "") => {
  const query = new Query().where("rol", "==", rol).limit(1);
  const roles = await Role.find(query);
  if (roles.length === 0) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};


const emailExiste = async (correo = "") => {
  const query = new Query().where('correo', '==', correo).limit(1);
  const usuarios = await Usuario.find(query);
  if (usuarios.length > 0) {
    throw new Error(`El correo ${correo}, ya está registrado en la base de datos`);
  }
};

const usuarioExisteId = async (id) => {
  const existe = await Usuario.findById(id);
  if (!existe) {
    throw new Error(`El id ${id}, no existe en la base de datos`);
  }
};
/*
const categoriaExisteId = async (id) => {
  const existe = await Categoria.findById(id);
  if (!existe) {
    throw new Error(`El id ${id}, no existe en las categorias`);
  }
};
const productoExisteId = async (id) => {
  const existe = await Producto.findById(id);
  if (!existe) {
    throw new Error(`El id ${id}, no existe en las categorias`);
  }
};*/
module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExisteId,
  //categoriaExisteId,
  //productoExisteId,
};
