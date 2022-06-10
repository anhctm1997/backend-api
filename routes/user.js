import userController from "../controller/userController";
import {
  verifyToken,
  verifyPermissions,
} from "../controller/middlewareController";
import { Router } from "express";
const routerUser = Router();
routerUser.get("/", verifyToken, verifyPermissions, userController.getAllUser);
routerUser.post("/", verifyToken, verifyPermissions, userController.addUser);
routerUser.post(
  "/login",
  verifyToken,
  verifyPermissions,
  userController.handleLogin
);
routerUser.get("/:id", verifyToken, verifyPermissions, userController.getUser);
routerUser.put(
  "/:id",
  verifyToken,
  verifyPermissions,
  userController.updateUser
);
routerUser.delete(
  "/:id",
  verifyToken,
  verifyPermissions,
  userController.deleteUser
);
module.exports = routerUser;
