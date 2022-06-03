const userController = require("../controller/userController");

const router = require("express").Router();
router.get("/", userController.getAllUser);
router.post("/", userController.addUser);
router.post("/login", userController.handleLogin);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
module.exports = router;
