const { response } = require("express");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar_jwt");
const { Query } = require("firefose");
const { googleVerify } = require("../helpers/google_verify");

const loginController = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    const query = new Query().where("correo", "==", correo);
    query.limit(1);
    const usuario = await Usuario.find(query);
    const usuarioObj = usuario[0];

    //verificar si email existe
    if (usuarioObj.correo != correo) {
      return res
        .status(400)
        .json({ msg: "Usuario / password no son correctos" });
    }
    //verificar si está activo}
    if (usuarioObj.estado == false) {
      return res.status(400).json({
        msg: "Usuario no esta activo comuniquese con el administrador",
      });
    }
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuarioObj.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario / password no son correctos" });
    }
    //generar JWT
    const token = await generarJWT(usuarioObj.id);

    res.json({
      usuarioObj,
      token,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};
const loginControllerGoogle = async (req, res = response) => {
  const { id_token } = req.body;
  console.log(id_token);
  try {
    const { correo, nombre, img,apellido } = await googleVerify(id_token);
    const query = new Query().where("correo", "==", correo);
    query.limit(1);
    const usuario = await Usuario.find(query);
    const usuarioObj = usuario[0];

    if (!usuarioObj) {
      // Tengo que crearlo
      const usuarioObj = await Usuario.create({
        nombre,
        apellido,
        rol: "USER_ROLE",
        nivelEducacion: ".",
        correo,
        estado:true,
        password: ":P",
        google: true,
      });
    }

    // Si el usuario en DB
    if (!usuarioObj.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuarioObj.id);
    delete usuarioObj.password;
    res.json({
      usuarioObj,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  loginController,
  loginControllerGoogle,
};
