const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController'); // Adjust the path to match your project structure

// POST request to create a new booking
router.post('/', bookingController.createBooking);

// GET request to retrieve all bookings for a specific customer
router.get('/customer/:customerId', bookingController.getBookingsByCustomer);

// PUT request to update the status of a booking
router.put('/:bookingId', bookingController.updateBookingStatus);

// PATCH request to cancel a booking
router.patch('/cancel/:bookingId', bookingController.cancelBooking);

// GET request to retrieve booking history for a specific customer
router.get('/history/:customerId', bookingController.getCustomerBookingHistory);

// PUT request to manage (update) a specific booking
router.put('/manage/:bookingId', bookingController.manageBooking);

module.exports = router;
