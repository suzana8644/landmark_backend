const express = require('express');
const router = express.Router();

const connectController = require('../controllers/connect.Controller');

router.post('/', connectController.connectCreate);

module.exports = router;