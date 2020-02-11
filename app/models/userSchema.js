const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200
    },
    firstName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200
    },
    dateBirth: {
        type: Date,
        default: null
    },
    address: {
        type: String,
        minlength: 20,
        maxlength: 200
    },
    zipCode: {
        type: String,
        minlength: 6,
        maxlength: 200
    },
    country: {
        type: String,
        minlength: 10,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        minlength: 13,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    date_register: {
        type: Date,
        default: Date.now()
    },
    date_update: {
        type: Date,
        default: Date.now()
    },
    date_delete: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isSubscribe: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema);

module.exports.User = User;