const express = require("express");
const router = express.Router();
const StoreImageShopify = require("../controllers/StoreImageShopify");
// const multer = require('multer');
// const uploadController = require('../controllers/UploadController');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/uploadfile', upload.single('image'), uploadController.uploadImage);

router.get("/", StoreImageShopify.findAll);

module.exports = router;
