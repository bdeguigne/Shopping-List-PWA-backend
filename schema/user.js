const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    firstName: String,
    subscriptionToken: Object,
  },
  {
    collation: { locale: "en", strength: 2 },
  }
);

module.exports = mongoose.model("users", userSchema);
