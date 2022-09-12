const express = require('express');
const router = express.Router();

const UserCtrl = require('../controller/UserCtrl');

const { login, register } = UserCtrl;

router.route('/login').post(login);
router.route('/register').post(register);


module.exports = router;