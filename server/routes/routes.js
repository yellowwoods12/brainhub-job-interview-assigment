const express = require('express');
const router = express.Router();
const { insertUser, getUsers } = require('../services/userServices');

router.route('/user')
    .post((req, res) => { insertUser(req, res) });

router.route('/users')
    .get((req, res) => { getUsers(req, res) });

module.exports = router;
