const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');
const GetTokenApiMagento = require('../controllers/GetTokenApiMagento');

router.get("/", ApiController.getAll);
router.post("/create", ApiController.create);
router.post("/update", ApiController.update);
router.delete("/delete/:id", ApiController.delete);
router.post("/gettoken", GetTokenApiMagento.get_token_api);

module.exports = router;