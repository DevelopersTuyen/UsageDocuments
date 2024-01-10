const Banner = require("../Model/Banner");

class BannerController {
  async findAll(req, res) {
    try {
      let banner = await Banner.find({});
      res.send({ status: true, data: banner });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async create(req, res) {
    try {
      let banner = new Banner(req.body);
      await banner.save();
      res.send({ status: true, data: banner });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async delete(req, res) {
    try {
      let banner = await Banner.findByIdAndDelete(req.params.id);
      if (!banner) {
        return res.status(404).send({ message: "Banner not found" });
      }
      res.send({ message: "Banner deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const banner = await Banner.findById(req.params.id);
      if (banner == null) {
        return res.status(404).json({ message: "not founded banner" });
      }
      banner.url_of_image = req.body.url_of_image;
      banner.redirect_URL = req.body.redirect_URL;
      banner.status = req.body.status;
      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new BannerController();
