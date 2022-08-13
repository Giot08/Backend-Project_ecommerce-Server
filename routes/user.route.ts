import { Router } from "express";

// controllers
import {
  getAllUsers,
  getUserById,
  createNewUser,
  putUser,
  deleteUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/all", getAllUsers);
router.get("/id", getUserById);
router.post("/", createNewUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
