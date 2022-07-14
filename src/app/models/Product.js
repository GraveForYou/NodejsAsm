const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({

    name: { type: String, required: true, maxLength: 255 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: [{
        type: String,
        required: true
    }],
    gender: [{
        type: String,
        required: true
    }],
    color: [{
        type: String,
        required: true
    }],
    size: [{
        type: String,
        required: true
    }],
    image: [{
        type: String,
        required: true
    }],
}, {
    timestamps: true,
});


module.exports = mongoose.model('Product', Product)