/**
 * Author: Janani Thiagarjan
 * Author: Shilpa Bhat
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
        latitude: Number,
        longitude: Number,
        timestamp: Date
    }],
    nick_name: {
        type: String,
        required: false
    },
    device_id: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    timezone: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('user_events', user_events);