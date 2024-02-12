const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const decoratorSchema = new Schema({
    userId: {  // Assuming each decorator is also a user
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    expertise: String,
    experience: Number, // years of experience
    portfolio: [String], // URLs to portfolio images or documents
}, { timestamps: true });

module.exports = mongoose.model('Decorator', decoratorSchema);
