const express = require('express');
const router = express.Router();

const DeviceOfUserController = require('../controllers/DeviceOfUserController');
const ExportController = require('../controllers/ExportController');

router.post('/',DeviceOfUserController.get_user);
router.post('/getdatadate/:time_start/:time_stop/:columns',DeviceOfUserController.get_user_date);
router.get('/exportuser',ExportController.exportUser);
router.get('/exportuser/:time_start/:time_stop/:columns',ExportController.exportUser2);
router.get('/exportdevice',ExportController.exportDevice);
router.get('/chart',DeviceOfUserController.chart);
router.post('/delete',DeviceOfUserController.delete);
module.exports = router;