const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email:String,
  type: String,
  picture: String,
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
