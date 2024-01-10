const express = require("express");
const router = express.Router();
const IpController = require("../controllers/IpController");

router.get("/get-ip", IpController.findAll);
router.get("/find-ip/:platform/:active", IpController.findOne);
router.post("/create-ip", IpController.create);
router.put("/update-ip/:id", IpController.update);
router.delete("/delete-ip/:id", IpController.delete);

// router.get("/getoneaccount/:mail", UpdateController.findOneAccount);

module.exports = router;
