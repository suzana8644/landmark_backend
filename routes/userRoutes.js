const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile by ID
router.get('/profile/:userId', userController.getUserProfile);

// Update user profile
router.put('/profile/:userId', userController.updateUserProfile);

module.exports = router;
