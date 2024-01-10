const mongoose = require("mongoose");
const { Schema } = mongoose;

const QRcodeSchema = new mongoose.Schema({
  product_name: {
    type: String,
    require: [true, "please enter product name"],
  },
  product_image: {
    type: String,
    require: [false],
  },
  url: {
    type: String,
    require: [true, "please enter url"],
  },
  date_time: {
    type: String,
  },
  user: {
    type: String,
    require: [true, "please enter user"],
  },
  click: {
    type: String,
    required: true,
    default: "0",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});
QRcodeSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    ret.id = doc._id;
  },
});
module.exports = mongoose.model("QRcode", QRcodeSchema, "QRcode");
