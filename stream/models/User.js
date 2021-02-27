const mongoose = require('mongoose');

//Defining user schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    stream_key: {
        type: String
    }
});

module.exprts = mongoose.model("User", userSchema)
