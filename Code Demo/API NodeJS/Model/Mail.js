const mongoose = require("mongoose");

const Mail = new mongoose.Schema({
  mail: {
    type: String,
    require: [true, "please enter email"],
  },
  code: {
    type: String,
    require: [true, "please enter code"],
  },
  password: {
    type: String
  },
  active: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  companyName: {
    type: String
  },
  postCode: {
    type: String
  },
  prefectures: {
    type: String
  },
  city: {
    type: String
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  presenter: {
    type: String
  },
  isFirstLogin: {
    type: Boolean,
    default: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// "email":"admin@gmail.com",
// "password":"$2b$10$I1SBxlzjhsnk.s002MJbO.S33MH/1nZKN1axM3lnPchn35X5u342K",
// "fullName":"admin"

module.exports = mongoose.model("Mail", Mail, "Mail");