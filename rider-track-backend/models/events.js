/**
 * Author: Janani Thiagarjan
 * Task: Model setup for accessing db
 * Task no: 45,46,47,
 * Date: 09/20/2019
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let events = new Schema({
    creator_id: {
        type: Number,
        required: true,
        trim: true
    },
    event_name: {
        type: String,
        required: true
    },
    data_time: {
        type: Date,
        default: null
    },
    duration: {
        type: String,
        default: null
    },
    max_participant: {
        type: Number
    },
    checkpoints: [{
        lat: Number,
        long: Number
    }],
    participants: [{
        id: Number,
        name: String
    }]
});


module.exports = mongoose.model("events", events);