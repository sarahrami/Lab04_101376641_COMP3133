const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
    },
    address: {
        city: {
            type: String,
            required: true,
            match: /^[a-zA-Z\s]+$/,
        },
        zipcode: {
            type: String,
            required: true,
            match: /^\d{5}-\d{4}$/,
        },
    },
    website: {
        type: String,
        required: true,
        match: /^(http|https):\/\/\S+$/,
    },
    phone: {
        type: String,
        required: true,
        match: /^1-\d{3}-\d{3}-\d{4}$/,
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User