const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/user");
const { check } = require("express-validator");
const {
  esRoleValido,
  emailExiste,
  usuarioExisteId,
} = require("../helpers/db_validators");

const { validarCampos, validarJWT, tieneRole } = require("../middlewares");

const router = Router();
router.get("/", [validarJWT, validarCampos], usuariosGet);
router.put(
  "/:id",
  [validarJWT, check("id").custom((id) => usuarioExisteId(id)), validarCampos],
  usuariosPut
);

router.post(
  "/",
  [
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("nivelEducacion", "El nivel de Educacion es obligatorio")
      .not()
      .isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("haspass", "El password debe ser mas de 6 letras").isLength({
      min: 6,
    }),
    check("rol").custom((rol) => esRoleValido(rol)),
    check("correo").custom((correo) => emailExiste(correo)),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id").custom((id) => usuarioExisteId(id)),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
