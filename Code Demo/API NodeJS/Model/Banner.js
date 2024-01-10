const mongoose = require("mongoose");
const { Schema } = mongoose;
const BannerOfAppSchema = new mongoose.Schema({
  url_of_image: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(v);
      },
      message: "入力されたURLのフォーマットが正しくありません。再入力してください。 ",
    },
  },
  redirect_URL: {
    type: String,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});
BannerOfAppSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    ret.id = doc._id;
  },
});
module.exports = mongoose.model("Banner", BannerOfAppSchema, "Banner");
