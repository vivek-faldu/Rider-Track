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
        type: String,
        required: true,
        trim: true
    },
    event_id: {
        type: String,
        required: true
    },
    checkpoints: [{
        lat: String,
        long: String,
        timestamp: String
    }]
});


module.exports = mongoose.model('user_events', user_events);