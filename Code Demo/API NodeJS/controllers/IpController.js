const Ip = require("../Model/Ip");

class IpController {
  // get ip 
  async findAll(req, res) {
    try {
      let ip = await Ip.find({}).sort({ 'created_at': -1});
      res.send({ status: true, data: ip });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }
  async findOne(req, res) {
    try {
      let ip = await Ip.find({ platform: req.params.platform, active:req.params.active });
      res.send({ status: true, data: ip });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }
  async create(req, res) {
    try {
      let ip = new Ip(req.body);
      await ip.save();
      res.send({ status: true, data: ip });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }
  async update(req, res) {
    try {
      const ip = await Ip.findById(req.params.id);
      if (ip == null) {
        return res.status(404).json({ message: "not founded Coupon" });
      }
      ip.name = req.body.name;
      ip.ip = req.body.ip;
      ip.platform = req.body.platform;
      ip.active = req.body.active;
      const ips = await ip.save();
      res.json(ips);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      let ip = await Ip.findByIdAndDelete(req.params.id);
      if (!ip) {
        return res.status(404).send({ message: "Ip not found" });
      }
      res.send({ message: "Ip deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new IpController();
