const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const decorationSchema = new Schema({
    decoratorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    themes: [String],
    images: [String],
    categories: [String],
    availability: {
        startDate: Date,
        endDate: Date
    },
    price: Number
}, {timestamps: true});

module.exports = mongoose.model('Decoration', decorationSchema);
