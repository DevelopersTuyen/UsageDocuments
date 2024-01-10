const Coupon = require("../Model/Coupon.js");

class CouponController {
  async findAll(req, res) {
    try {
      let coupon = await Coupon.find({}).sort({ 'created_at': -1});
      res.send({ status: true, data: coupon });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async create(req, res) {
    try {
      let coupon = new Coupon(req.body);
      await coupon.save();
      res.send({ status: true, data: coupon });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async updateClick(req, res) {
    try {
      //console.log(req.body);
      let coupon = await Coupon.findById(req.body.id);
      coupon.click++;
      await coupon.save();
      res.send({ status: true, data: coupon });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async delete(req, res) {
    try {
      let coupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!coupon) {
        return res.status(404).send({ message: "Coupon not found" });
      }
      res.send({ message: "Coupon deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedCoupon = await Coupon.findById(req.params.id);
      if (updatedCoupon == null) {
        return res.status(404).json({ message: "not founded Coupon" });
      }
      updatedCoupon.coupon_expiry = req.body.coupon_expiry;
      updatedCoupon.coupon_title = req.body.coupon_title;
      updatedCoupon.coupon_detail = req.body.coupon_detail;
      updatedCoupon.coupon_banner = req.body.coupon_banner;
      updatedCoupon.coupon_code = req.body.coupon_code;
      updatedCoupon.click = req.body.click;
      const coupon = await updatedCoupon.save();
      res.json(coupon);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async chart(req, res) {
    try {
      let coupon = await Coupon.find({}).sort({ 'created_at': -1}).limit(10);
      let labels = [];
      let data = [];
      for(let c of coupon){
        labels.push(c.coupon_title);
        data.push(c.click);
      }
      res.send({ status: true, data: {labels,data } });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }
}

module.exports = new CouponController();
