import serverController from "../controller/serverController";
import { Router } from "express";
import middlewareController from "../controller/middlewareController";
const router = Router();
router.get(
  "/",
  middlewareController.verifyToken,
  serverController.getAllServer
);
router.post("/", middlewareController.verifyToken, serverController.addServer);
router.get(
  "/:id",
  middlewareController.verifyToken,
  serverController.getServer
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  serverController.updateServer
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  serverController.deleteServer
);
export default router;
