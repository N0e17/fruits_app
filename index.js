const express = require("express");
const mongoose = require("mongoose");

const methodOverride = require("method-override");

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const mongoUri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWD}@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(mongoUri, { useNewUrlParser: true }, () => {
  console.log(
    "Establising connection with Mongo DB: " + process.env.MONGO_DB_NAME
  );
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Successfully Established connection");
});

db.on("disconnected", () => {
  console.log("Successfully Disconnected from MongoDB");
});

db.on("error", (err) => {
  console.log("Unable to establish connection: " + err.message);
});

const fruitsController = require("./controllers/fruit_control.js");
app.use("/fruits", fruitsController);

app.get("/", (req, res) => {
  res.redirect("/fruits");
})

app.listen(port, () => {
  console.log("Fruits app is listening on port: " + port);
});
