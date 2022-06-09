import { Router } from "express";
import authController from "../controller/authController";
import middlewareController from "../controller/middlewareController";
const { login, resetToken } = authController;
const routerAuth = Router();
routerAuth.post("/", login);
routerAuth.post("/resetToken", resetToken);
export default routerAuth;
