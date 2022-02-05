const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const notificationRoute = require("./routes/notification");
const userRoute = require("./routes/user");
const ingredientsRoute = require("./routes/ingredients");
const recipesRoute = require("./routes/recipes");
console.log(process.env.DB_CONNECTION);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Successfully connected to database")
);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/notification", notificationRoute);
app.use("/users", userRoute);
app.use("/ingredients", ingredientsRoute);
app.use("/recipes", recipesRoute);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
