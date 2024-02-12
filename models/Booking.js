const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    decorationId: {
        type: Schema.Types.ObjectId,
        ref: 'Decoration'
    },
    eventDate: Date,
    bookingDate: Date,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled']
    },
    transactionDetails: {
        amount: Number,
        paymentMethod: String,
        paymentStatus: {
            type: String,
            enum: ['paid', 'pending', 'failed']
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
