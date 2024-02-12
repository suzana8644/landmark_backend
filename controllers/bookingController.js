const Booking = require('../models/Booking'); // Adjust the path according to your project structure

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body,
            bookingDate: new Date() // Set the booking date to current date/time
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bookings for a customer
exports.getBookingsByCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const bookings = await Booking.find({ customerId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.bookingId,
            { status },
            { new: true }
        );
        if (updatedBooking) {
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const cancelledBooking = await Booking.findByIdAndUpdate(
            req.params.bookingId,
            { status: 'cancelled' },
            { new: true }
        );
        if (cancelledBooking) {
            res.json(cancelledBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCustomerBookingHistory = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const bookings = await Booking.find({ customerId }).sort({ bookingDate: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage a specific booking (e.g., update details, confirm, or cancel)
exports.manageBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const updates = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
        if (updatedBooking) {
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
