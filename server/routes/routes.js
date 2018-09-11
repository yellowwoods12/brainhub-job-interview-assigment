const express = require('express');
const router = express.Router();
const { insertUser } = require('../services/userServices');

router.route('/user')
    .post((req, res) => { insertUser(req, res) });

module.exports = router;
