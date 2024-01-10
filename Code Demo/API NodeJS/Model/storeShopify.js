const mongoose = require("mongoose");
const { Schema } = mongoose;

const StoreShopify = new mongoose.Schema({

    vendor: {
        type: String,
      },
      storeDescription: {
        type: String,
      },
      logo: {
        data: String,
        filename: String,
      },
      banner: {
        data: String,
        filename: String,
      },
      introductionVideo: {
        type: String
      },
      listPriceType: {
        type: String
      },
      freeSample: {
        type: String,
      },
      salePrice: {
        type: String,
      },
      email: {
        type:String,
        },
});

module.exports = mongoose.model("StoreShopify", StoreShopify, "StoreShopify");