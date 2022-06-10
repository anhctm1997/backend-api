import { Router } from "express";
import authController from "../controller/authController.js";
import middlewareController from "../controller/middlewareController.js";
const { login, resetToken } = authController;
const routerAuth = Router();
routerAuth.post("/", login);
routerAuth.post("/resetToken", resetToken);
export default routerAuth;
