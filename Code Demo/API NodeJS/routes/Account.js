const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/AccountController');

router.post('/login',AccountController.login);

module.exports = router;