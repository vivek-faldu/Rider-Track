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
    checkpoints: [],
    nick_name: {
        type: String,
        required: false
    },
    device_id: {
        type: Number,
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
        required: false
    }
});


module.exports = mongoose.model('user_events', user_events);
