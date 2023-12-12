const mongoose = require("mongoose");
const products = new mongoose.Schema({
  product_id: { type: Number },
  product_name: { type: String },
  product_price: { type: Number },
  product_amount: { type: Number },
});

module.exports = mongoose.model("products", products);
