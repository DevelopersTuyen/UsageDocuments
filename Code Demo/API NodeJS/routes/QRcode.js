const express = require("express");
const router = express.Router();
const ExportController = require("../controllers/ExportController");
const QRcodeController = require("../controllers/QRcodeController");

router.get("/", QRcodeController.findAll);
router.post("/create", QRcodeController.create);
router.post("/updateClick", QRcodeController.updateClick);
router.post("/updateClick2", QRcodeController.updateClick2);
router.delete("/delete/:id", QRcodeController.delete);
router.get("/export", ExportController.exportScan);
router.get("/export/:time_start/:time_stop", ExportController.exportScan2);
router.get("/exportotal/:time_start/:time_stop", ExportController.TotalScanProduct2);
router.get("/exportotal", ExportController.TotalScanProduct);
// router.get("/expordatetotal", ExportController.TotalScanProduct);
router.get("/chart", QRcodeController.chart);
router.get("/chart2", QRcodeController.chart2);

router.get("/get-date/:time_start/:time_stop", QRcodeController.GetDataDate);
router.get("/chart3/:time_start/:time_stop", QRcodeController.chart3);

module.exports = router;
