const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/user");
const { Query } = require("firefose"); 
const { async } = require("@firebase/util");
const usuariosGet = async (req, res = response) => {
  const { desde = 0, limit = 5 } = req.query;

  const query = new Query().where('estado', '==', true);

  // Obtener usuarios con paginación
  query.limit(limit);
  query.offset(desde);
  const usuarios = await Usuario.find(query);
  
  // Obtener el total de usuarios con estado: true
  const total = (await Usuario.find(query)).length;

  res.json({
    total,
    usuarios,
  });
};

//? DUDA SOBRE LA ACTUALIZACION, POR SEPARADO MEJOR ENTRE DATO GENERAL Y CONTRASEÑA
const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { haspass,correo,...resto } = req.body;

  if (haspass) {
    const salt = bcryptjs.genSaltSync(); // mas complicado la encriptacion
    resto.password = bcryptjs.hashSync(haspass, salt);
  }
  //!CUIDADO CON EL ROL 
  const usuario = await Usuario.updateById(id, resto);
  delete usuario.password;
  res.json({ usuario: usuario });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, haspass, apellido, nivelEducacion, rol } = req.body;

  //hash password
  const salt = bcryptjs.genSaltSync();
  const password = bcryptjs.hashSync(haspass, salt);

  const usuario = await Usuario.create({
    nombre,
    correo,
    password,
    apellido,
    rol,
    nivelEducacion,
  });

  delete usuario.password;
  res.json({ usuario: usuario });
};

const usuariosDelete = async(req, res = response) => {
  const id = req.params.id;
  /*
    Eliminar de verdad
  const usuario = await Usuario.deleteById(id);
  res.json({ usuario: "Eliminado con exito" });*/
  const usuario = await Usuario.updateById(id,{estado: false});
  delete usuario.password;
  res.json({ usuario: usuario });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
