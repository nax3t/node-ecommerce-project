var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	formattedDate: String,
  date: Date,
  time: String,
  stock: Number
});

module.exports = mongoose.model("Product", productSchema);