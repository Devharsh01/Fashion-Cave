const mongoose = require('mongoose');

const Promo = mongoose.model("Promo",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    off_price:{
        type: Number,
        required: true,
    },
    validity_till:{
        type: Date,
        required: true,
        default: Date.now,
    },
    validity_start:{
        type: Date,
        required: true,
        default: Date.now,
    }
})

module.exports = Promo;