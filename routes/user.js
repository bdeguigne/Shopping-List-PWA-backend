const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id/token", userController.storeToken);
router.delete("/:id", userController.deleteToken);

module.exports = router;
