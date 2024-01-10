const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApiSchema = new mongoose.Schema({
  name_website: {
    type: String,
    require: [true, "please enter Api name_website"],
  },
  url_website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(v);
      },
      message: "入力されたURLのフォーマットが正しくありません。再入力してください。",
    },
  },
  api_key: {
    type: String,
    require: [true, "please enter Api api_key"],
  },
  user_name: {
    type: String,
    require: [true, "please enter Api user_name"],
  },
  password: {
    type: String,
    require: [true, "please enter Api password"],
  },
  status: {
    type: Number,
    default: 0,
    require: [true, "please enter Api status"],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  }
});
module.exports = mongoose.model("Api", ApiSchema, "Api");
