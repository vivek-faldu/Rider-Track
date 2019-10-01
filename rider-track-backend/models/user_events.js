/**
 * Author: Janani Thiagarjan
 * Task: Schema for User Events collection
 * Task no: 64
 * Date: 09/30/2019
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user_events = new Schema({
    user_id: {
        type: Number,
        required: true,
        trim: true
    },
    event_id: {
        type: Number,
        required: true
    },
    checkpoints: [{
        lat: Number,
        long: Number,
        timestamp: Date
    }]
});


module.exports = mongoose.model('user_events', user_events);