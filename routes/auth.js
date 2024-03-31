const { Router } = require("express");
const { check } = require("express-validator");
const { loginController, loginControllerGoogle } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

router.post(
  "/login",[
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],loginController
);
router.post(
  "/logingoogle",[
    check("id_token", "El token de google es necesario"). not().isEmpty(),
    validarCampos,
  ],loginControllerGoogle
);
module.exports = router;
