const express = require("express");
const router = express.Router();

const UpdateController = require("../controllers/UpdateController");

router.get("/productsstatusdraft", UpdateController.productsstatusdraft);
router.get("/productstatusupdatehistory", UpdateController.productstatusupdatehistory);
router.post("/updateproductsstatus", UpdateController.updateproductsstatus);
router.post("/turnonschedule", UpdateController.turnonschedule);
router.post("/deleteproductstatusupdatehistory", UpdateController.deleteproductstatusupdatehistory);


//active account face 2
router.get("/getallaccount", UpdateController.findAllAccount);
router.get("/getoneaccount/:mail", UpdateController.findOneAccount);
router.put("/updateaccount/:id", UpdateController.updateAccount);
router.put("/updatepasswordaccount/:id", UpdateController.updatePasswordAccount);
router.put("/sendMailAccountCode/:id", UpdateController.sendMailAccountCode);
router.put("/sendMailAccountPassword/:id", UpdateController.sendMailAccountPassword);
router.post('/createAccount', UpdateController.createAccount);
router.delete("/delete/:id/:email", UpdateController.deleteAccount);
module.exports = router;
