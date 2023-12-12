const mongoose = require("mongoose");
const orders = new mongoose.Schema({
  orders_id: { type: String },
  username: { type: String },
  orderDetail: [
    {
      id: { type: String },
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  total_price: { type: Number },
});

module.exports = mongoose.model("orders", orders);
