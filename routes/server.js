import serverController from "../controller/serverController.js";
import { Router } from "express";
import middlewareController from "../controller/middlewareController.js";
const routerServer = Router();
routerServer.get(
  "/",
  middlewareController.verifyToken,
  serverController.getAllServer
);
routerServer.post(
  "/",
  middlewareController.verifyToken,
  serverController.addServer
);
routerServer.get(
  "/:id",
  middlewareController.verifyToken,
  serverController.getServer
);
routerServer.put(
  "/:id",
  middlewareController.verifyToken,
  serverController.updateServer
);
routerServer.delete(
  "/:id",
  middlewareController.verifyToken,
  serverController.deleteServer
);
export default routerServer;
