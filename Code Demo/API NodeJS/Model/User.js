const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "please enter email"],
  },
  password: {
    type: String,
    require: [true, "please enter password"],
  },
  fullName: {
    type: String,
    require: [true, "please enter fullName"],
  },
  role: {
    type: String,
    require: [true, "please enter role"],
  },
});

// "email":"admin@gmail.com",
// "password":"$2b$10$I1SBxlzjhsnk.s002MJbO.S33MH/1nZKN1axM3lnPchn35X5u342K",
// "fullName":"admin"

module.exports = mongoose.model("User", UserSchema, "User");
