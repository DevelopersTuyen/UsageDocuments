const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please enter title"],
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
  active: {
    type:String,
  },
});
FormSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    ret.id = doc._id;
  },
});
module.exports = mongoose.model("Form", FormSchema, "Form");
