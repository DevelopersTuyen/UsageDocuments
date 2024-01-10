const storeShopify = require("../Model/storeShopify.js");
// const Form = require("../Model/Form.js");
class StoreImageShopify {
    async findAll(req, res) {
      try {
        console.log("!232131");
        let images = await storeShopify.find({}).sort({ '_id': -1});
        res.send({ status: true, data: images });

      } catch (error) {
        res.send({ status: false, data: error });
      }
    }
}
module.exports = new StoreImageShopify();