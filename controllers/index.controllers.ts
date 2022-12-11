import { login } from "./auth.controllers";
import { createNewCategory, getAllCategories, getCategory } from "./category.controllers";
import {
  getAllRoles,
  getUserById,
  getAllUsers,
  createNewUser,
  putUser,
  putUserEmail,
  removeUser,
  destroyUser,
} from "./users.controllers";

export {
  login,
  getAllRoles,
  getUserById,
  getAllUsers,
  createNewUser,
  putUser,
  putUserEmail,
  removeUser,
  destroyUser,
  createNewCategory,
  getAllCategories,
  getCategory,
};
