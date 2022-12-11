import { Router } from "express";
import { check } from "express-validator";

import { createNewCategory, getAllCategories, getCategory } from "../controllers/index.controllers";
import { validFields } from "../middlewares/index.middeware";

const router = Router();

// Crear
router.post(
  "/new",
  [
    check("name", "name is empty").not().isEmpty(),
    check("name", "name can only contain letters").isAlpha(),
    check("user", "user is empty").not().isEmpty(),
    check("user", "user is not a email").isEmail(),
    validFields,
  ],
  createNewCategory
);
// Todas
router.get("/all", getAllCategories);

// Una
router.get("/:name", getCategory);
// Editar
router.put("/update/:id", (req, res) => {
  res.json("ok - edit");
});
// Borrar
router.delete("/remove/:id", (req, res) => {
  res.json("ok - delete");
});

export default router;
