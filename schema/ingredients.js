const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  path: Object,
});

module.exports = mongoose.model("ingredients", ingredientsSchema);
