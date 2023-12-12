const mongoose = require("mongoose");

const register = new mongoose.Schema({
  userName: { type: String },
  passWord: { type: String },
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("register", register);
