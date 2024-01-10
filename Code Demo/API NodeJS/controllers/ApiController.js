const Api = require("../Model/Api.js");

class ApiController {
  async getAll(req, res) {
    try {
      let api = await Api.find({});
      res.send({ status: true, data: api });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async create(req, res) {
    try {
      let api = new Api(req.body);
      api.status = 0;
      await api.save();
      res.send({ status: true, data: api });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async delete(req, res) {
    try {
      let api = await Api.findByIdAndDelete(req.params.id);
      if (!api) {
        res.send({ status: false, data: "api not found" });
      }
      res.send({ status: true, data: "api deleted successfully" });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async update(req, res) {
    try {
      const api = await Api.findById(req.body.id);
      if (api == null) {
        res.send({ status: false, data: "API không tồn tại" });
      }
      else {
        if (api.status == 0 && req.body.status == 1) {
          let apis = await Api.find({ status: 1 });
          for (let a of apis) {
            a.status = 0;
            await a.save();
          }
        }
        api.name_website = req.body.name_website;
        api.url_website = req.body.url_website;
        api.api_key = req.body.api_key;
        api.user_name = req.body.user_name;
        api.password = req.body.password;
        api.status = req.body.status;
        await api.save();
        res.send({ status: true, data: api });
      }
    } catch (err) {
      res.send({ status: false, data: err });
    }
  }
}

module.exports = new ApiController();
