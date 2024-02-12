const express = require('express');
const router = express.Router();
const decoratorController = require('../controllers/decoratorController');

// POST request to create a new decorator profile
router.post('/', decoratorController.createDecoratorProfile);
router.get('/', decoratorController.getDecorators);

// GET request to retrieve a decorator profile by User ID
router.get('/:userId', decoratorController.getDecoratorProfile);

// PUT request to update a decorator profile
router.put('/:userId', decoratorController.updateDecoratorProfile);

module.exports = router;
