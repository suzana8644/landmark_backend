const userRoutes = require('./routes/userRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {registerUser, loginUser} = require("./controllers/userController");
const connectRoutes = require('./routes/connectRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const orderRoutes = require("./routes/order");
const esewaRoutes = require("./routes/esewa");
const imageRoutes = require('./routes/imageRoutes');
const {createOrder, getAllOrders} = require("./order_controller");
const {handleEsewaSuccess} = require("./controllers/esewaController");
const {updateOrderAfterPayment} = require("./controllers/orderController");
const {IncomingForm} = require("formidable");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/users', userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/esewa", esewaRoutes);
app.use('/api/connect', connectRoutes);
app.use('/images', express.static('files')); // Serve uploaded images
app.use('/api', imageRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Could not connect to MongoDB', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to LandmarkDecor API!');
});
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/orders/create', createOrder);
app.get("/orders", getAllOrders)
app.get("/success", handleEsewaSuccess, updateOrderAfterPayment);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ error: 'Server error!'});
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
