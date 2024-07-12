const mongoose = require('mongoose');

//For Adding User Details
const orderSchema = new mongoose.Schema({
    orderId:{
        type: Number,
        required: true,
    },
    userId:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    items: {
        type: Object,
        default: [],
    },
    status: {
        type: String,
        default: "In Process",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String
    }
})

const Orders = mongoose.model('Orders',orderSchema);

module.exports = Orders;