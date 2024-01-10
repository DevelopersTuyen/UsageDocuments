const mongoose = require("mongoose");
const { Schema } = mongoose;

const SurreveySchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please enter title"],
  },
  status: {
    type: String,
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(v);
      },
      message: "入力されたURLのフォーマットが正しくありません。再入力してください。",
    },
  },
});
SurreveySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    ret.id = doc._id;
  },
});
module.exports = mongoose.model("Surrevey", SurreveySchema, "Surrevey");
