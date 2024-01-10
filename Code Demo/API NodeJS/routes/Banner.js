const express = require("express");
const router = express.Router();
const Banner = require("../controllers/BannerController");

router.get("/", Banner.findAll);
router.post("/create", Banner.create);
router.delete("/delete/:id", Banner.delete);
router.put("/update/:id", Banner.update);
module.exports = router;
