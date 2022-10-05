import { Router } from "express";
import { check } from "express-validator";
import {
  validFields,
  validRoles,
  validEmailExists,
  validAdminRole,
  validJWT,
  validUser,
} from "../middlewares/validators";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  putUser,
  putUserEmail,
  removeUser,
  getAllRoles,
  destroyUser,
} from "../controllers/users.controllers";

const router = Router();

router.get("/roles", [validJWT, validUser, validAdminRole], getAllRoles);
router.get("/id/:id", [validJWT, validUser, validAdminRole], getUserById);
router.get("/all", [validJWT, validUser, validAdminRole], getAllUsers);
router.post(
  "/",
  [
    check("name", "El nombre esta vacio").not().isEmpty(),
    check("lastname", "El apellido esta vacio").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("password", "El password esta vacio").not().isEmpty(),
    check("password", "El password debe tener al menos 8 caracteres").isLength({
      min: 8,
    }),
    check("role").custom(validRoles),
    check("email").custom(validEmailExists),
    validFields,
  ],
  createNewUser
);
router.put(
  "/update/:id",
  [
    check("name", "El nombre esta vacio").not().isEmpty(),
    check("lastname", "El apellido esta vacio").not().isEmpty(),
    check("email", "No se puede enviar el email").isEmpty(),
    validJWT,
    validUser,
  ],
  putUser
);
router.put(
  "/email/",
  [
    check("email", "No es un correo valido").isEmail(),
    check("email").custom(validEmailExists),
    validJWT,
    validUser,
    validFields,
  ],
  putUserEmail
);
router.put("/remove/", [validJWT, validUser], removeUser);
router.delete("/destroy/:id",[validJWT, validUser, validAdminRole], destroyUser);

export default router;
