/**
 * Author: Janani Thiagarjan
 * Task: Model setup for accessing db
 * Task no: 45,46,47,
 * Date: 09/20/2019
 * 
 * Task: Added event_description to the events model
 * Task no: 83
 * Date: 10/07/2019
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
    event_description: {
        type: String,
        required: true
    },
    date_time: {
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
        latitude: Number,
        longitude: Number
    }],
    place: {
        type: String,
        default: null
    },
    participants: [{
        id: Number,
        name: String
    }]
});


module.exports = mongoose.model("events", events);