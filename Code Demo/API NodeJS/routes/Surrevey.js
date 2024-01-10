const express = require("express");
const router = express.Router();

const SurreveyController = require("../controllers/SurreveyController");

router.get("/", SurreveyController.findAll);
router.post("/create", SurreveyController.create);
router.delete("/delete/:id", SurreveyController.delete);
router.put("/update/:id", SurreveyController.update);
module.exports = router;
