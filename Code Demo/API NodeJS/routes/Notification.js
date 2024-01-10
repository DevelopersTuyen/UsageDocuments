const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/NotificationController');

router.post('/', NotificationController.getAll);
router.post('/create', NotificationController.create);
router.post('/cancel', NotificationController.cancel);
module.exports = router;