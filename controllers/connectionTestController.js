const Booking = require('../models/Booking'); // Adjust the path according to your project structure

// Create a new booking
exports.testConnection = async (req, res) => {
    try {
        res.status(201).json("Connected successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};