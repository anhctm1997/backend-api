import userController from "../controller/userController.js";
import middlewareController from "../controller/middlewareController.js";
import { Router } from "express";
const routerUser = Router();
routerUser.get(
  "/",
  middlewareController.verifyPermissions,
  userController.getAllUser
);
routerUser.get(
  "/find",
  middlewareController.verifyPermissions,
  userController.findUser
);
routerUser.post(
  "/",
  middlewareController.verifyPermissions,
  userController.addUser
);
routerUser.get(
  "/:id",
  middlewareController.verifyPermissions,
  userController.getUser
);
routerUser.put(
  "/:id",
  middlewareController.verifyPermissions,
  userController.updateUser
);
routerUser.delete(
  "/:id",
  middlewareController.verifyPermissions,
  userController.deleteUser
);
export default routerUser;
