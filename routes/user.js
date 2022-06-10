import userController from "../controller/userController.js";
import middlewareController from "../controller/middlewareController.js";
import { Router } from "express";
const routerUser = Router();
routerUser.get(
  "/",
  middlewareController.verifyToken,
  middlewareController.verifyPermissions,
  userController.getAllUser
);
routerUser.post(
  "/",
  middlewareController.verifyToken,
  middlewareController.verifyPermissions,
  userController.addUser
);
routerUser.get(
  "/:id",
  middlewareController.verifyToken,
  middlewareController.verifyPermissions,
  userController.getUser
);
routerUser.put(
  "/:id",
  middlewareController.verifyToken,
  middlewareController.verifyPermissions,
  userController.updateUser
);
routerUser.delete(
  "/:id",
  middlewareController.verifyToken,
  middlewareController.verifyPermissions,
  userController.deleteUser
);
export default routerUser;
