import { Router } from "express";
import { check } from "express-validator";
import { validFields, validRoles } from "../middlewares/validators";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  putUser,
  deleteUser,
  getAllRoles,
} from "../controllers/users.controller";

const router = Router();

router.get("/roles", getAllRoles);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
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
    validFields,
  ],
  createNewUser
);
router.put(
  "/:id",
  [
    check("name", "El nombre esta vacio").not().isEmpty(),
    check("lastname", "El apellido esta vacio").not().isEmpty(),
  ],
  putUser
);
router.delete("/:id", deleteUser);

export default router;
