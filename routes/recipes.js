const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");

router.get("/", recipesController.getAll);
router.post("/add", recipesController.add);
router.delete("/:id", recipesController.delete);

module.exports = router;
