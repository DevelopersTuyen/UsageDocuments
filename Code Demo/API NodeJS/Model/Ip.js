const mongoose = require("mongoose");

const Ip = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please enter email"],
  },
  ip: {
    type: String,
    require: [true, "please enter code"],
  },
  platform: {
    type: String
  },
  active: {
    type: String
  }
});

// "email":"admin@gmail.com",
// "password":"$2b$10$I1SBxlzjhsnk.s002MJbO.S33MH/1nZKN1axM3lnPchn35X5u342K",
// "fullName":"admin"

module.exports = mongoose.model("Ip", Ip, "Ip");