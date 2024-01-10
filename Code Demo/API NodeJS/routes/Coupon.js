const express = require("express");
const router = express.Router();
const CouponController = require("../controllers/CouponController");
const ExportController = require("../controllers/ExportController");

router.get("/", CouponController.findAll);
router.post("/create", CouponController.create);
router.post("/updateclick", CouponController.updateClick);
router.delete("/delete/:id", CouponController.delete);
router.get("/export", ExportController.exportCoupon);
router.put("/update/:id", CouponController.update);
router.get("/chart", CouponController.chart);
module.exports = router;
