const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    message: String,
    email: String,
})

module.exports = mongoose.model('Connect', connectSchema);
