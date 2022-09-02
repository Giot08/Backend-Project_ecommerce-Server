import { Router } from "express";
import { check } from "express-validator";
import {
  validFields,
  validRoles,
  validEmailExists,
} from "../middlewares/validators";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  putUser,
  removeUser,
  getAllRoles,
  destroyUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/roles", getAllRoles);
router.get("/id/:id", getUserById);
router.get("/all", getAllUsers);
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
    validFields,
  ],
  putUser
);
router.put(
  "/email/:id",
  [
    check("email", "No es un correo valido").isEmail(),
    check("email").custom(validEmailExists),
    validFields,
  ],
  putUser
);
router.put(
  "/remove/:id",
  removeUser
);
router.delete("/destroy/:id", destroyUser);

export default router;
