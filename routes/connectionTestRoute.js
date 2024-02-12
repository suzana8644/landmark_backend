const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionTestController');

// POST request to create a new booking
router.get('/', connectionController.testConnection);

module.exports = router;
