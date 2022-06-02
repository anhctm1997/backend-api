const serverController = require("../controller/serverController");

const router = require("express").Router();
router.get("/", serverController.getAllUser);
router.post("/", serverController.addUser);
router.get("/:id", serverController.getUser);
router.put("/:id", serverController.updateUser);
router.delete("/:id", serverController.deleteUser);
module.exports = router;
