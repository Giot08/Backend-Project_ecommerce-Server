import { Router } from "express";
import { check } from "express-validator";
import { validFields } from "../middlewares/validData";

const router = Router();

// Todas
router.get("/all", (req, res) => {
  res.json("ok");
});
// Una
router.get("/:id", (req, res) => {
  res.json("ok");
});
// Crear
router.post("/new", (req, res) => {
  res.json("ok");
});
// Editar
router.put("/update/:id", (req, res) => {
  res.json("ok");
});
// Borrar
router.delete("/remove/:id", (req, res) => {
  res.json("ok");
});

export default router;
