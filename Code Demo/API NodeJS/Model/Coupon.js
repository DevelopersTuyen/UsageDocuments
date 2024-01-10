const mongoose = require("mongoose");
const { Schema } = mongoose;

const CouponSchema = new mongoose.Schema({
  coupon_expiry: {
    type: String,
    require: [true, "please enter coupon expiry"],
  },
  coupon_title: {
    type: String,
    require: [true, "please enter coupon title"],
  },
  coupon_detail: {
    type: String,
    require: [true, "please enter coupon detail"],
  },
  coupon_banner: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(v);
      },
      message: "入力されたURLのフォーマットが正しくありません。再入力してください。pngまたはjpgを追加してください。",
    },
  },
  coupon_code: {
    type: String,
    require: [true, "please enter coupon code"],
  },
  click: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});
CouponSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    ret.id = doc._id;
  },
});
module.exports = mongoose.model("Coupon", CouponSchema, "Coupon");
