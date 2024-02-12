const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'decorator', 'admin']
    },
    profile: {
        name: String,
        contactDetails: {
            phone: String,
            address: String,
            city: String,
            country: String
        },
        eventPreferences: [String], // for customers
        expertise: [String], // for decorators
        experience: String, // for decorators
        portfolio: [String], // for decorators
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
