const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },  // fixed typo
  password: { type: String, required: true },
  number: { type: Number },  // fixed typo
});
module.exports = mongoose.model("User", userSchema);