import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  putUser,
  deleteUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createNewUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
