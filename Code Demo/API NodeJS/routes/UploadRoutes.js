const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/UploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;