/**
 * Author: Janani Thiagarjan
 * Task: Schema for Users collection
 * Task no: 64
 * Date: 09/30/2019
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let users = new Schema({
    user_id: {
        type: String,
        //required: true,
        trim: true
    },
    is_admin: {
        type: Boolean,
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
    username: {
        type: String,
        required: true,
    },
    participated_events: [{
        type: String,
    }],
    created_events: [{
        type: String,
    }],
    live_event: {
        type: String,
        required: false,
        default: ""
    }
});


module.exports = mongoose.model('users', users);