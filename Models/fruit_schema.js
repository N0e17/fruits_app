const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean,
  },
  { timestamps: true }
);

const fruit = mongoose.model("fruit", fruitSchema);

module.exports = fruit;
