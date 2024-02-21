// config/db.js
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

module.exports = {
    url: process.env.MONGODB_URI,
    database: "test", // Replace with your database name
    imgBucket: "images",  // Or any name you prefer for image storage
};
