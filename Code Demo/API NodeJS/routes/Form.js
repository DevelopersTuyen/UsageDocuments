const express = require("express");
const router = express.Router();

const CouponController = require("../controllers/FormController");

router.get("/", CouponController.findAllForm);
router.post("/CreateForm", CouponController.createForm);
router.delete("/deleteForm/:id", CouponController.deleteForm);

module.exports = router;
