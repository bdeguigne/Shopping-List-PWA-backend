const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipeName: String,
  basket: Array,
  image: String,
});

module.exports = mongoose.model("recipe", recipeSchema);
