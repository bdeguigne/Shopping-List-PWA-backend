const express = require("express");
const router = express.Router();
const ingredientsController = require("../controllers/ingredientsController");

router.get("/", ingredientsController.getAll);

module.exports = router;
