const express = require('express');
const router = express.Router();
const decorationController = require('../controllers/decorationController');

// Create a new decoration
router.post('/', decorationController.createDecoration);

// Get all decorations
router.get('/', decorationController.getAllDecorations);

// Get a single decoration by ID
router.get('/:decorationId', decorationController.getDecorationById);

// Update a decoration by ID
router.put('/:decorationId', decorationController.updateDecoration);

// Delete a decoration by ID
router.delete('/:decorationId', decorationController.deleteDecoration);

router.get('/decorator/:decoratorId', decorationController.getDecorationsByDecorator);

module.exports = router;
