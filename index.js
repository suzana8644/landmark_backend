const userRoutes = require('./routes/userRoutes');
const decorationRoutes = require('./routes/decorationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const decoratorRoutes = require('./routes/decoratorRoutes');
const connectRoutes = require('./routes/connectRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {createDecoration, getAllDecorations, getDecorationById, updateDecoration, deleteDecoration} = require("./controllers/decorationController");
const {createBooking, getBookingsByCustomer, updateBookingStatus, cancelBooking} = require("./controllers/bookingController");
const {registerUser, loginUser} = require("./controllers/userController");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// for parsing application/json

// routes
app.use('/api/users', userRoutes);
app.use('/api/decorations', decorationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/decorators', decoratorRoutes);
app.use('/api/connect', connectRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Could not connect to MongoDB', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to LandmarkDecor API!');
});
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/decorations', createDecoration);
app.get('/decorations', getAllDecorations);
app.get('/decorations/:id', getDecorationById);
app.put('/decorations/:id', updateDecoration);
app.delete('/decorations/:id', deleteDecoration);
app.post('/bookings', createBooking);
app.get('/bookings/customer/:customerId', getBookingsByCustomer);
app.put('/bookings/:bookingId', updateBookingStatus);
app.patch('/bookings/cancel/:bookingId', cancelBooking);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ error: 'Server error!'});
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
