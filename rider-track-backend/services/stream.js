/**
 * Author: Vivek Faldu
 * Author: Shilpa Bhat
 * Task: Create mock stream for testing pusher service
 * Task no: 98
 * Task no: 115
 * Date: 10/05/2019
 */

var _ = require('lodash');
var send = require("./pusher");
var handle;
var handles = new Map();

function startStream(eventId) {
    handle = setInterval(() => {
        coordinates = [{ lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true) }, { lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true) }, { lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true) }, { lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true) }]
        send('my-rider-tracker', 'my-event', coordinates)
    }, 1000);
    handles.set("event_" + eventId + "_channel", handle);
    console.log("stream started");
    console.log("map size " + handles.size);
}

function stopStream(eventId) {
    var handle = "event_" + eventId + "_channel";
    clearInterval(handles.get(handle));
    if (handles.has(handle)) {
        handles.delete(handle)
    }
    console.log("stream stopped");
    console.log("map size " + handles.size);

}

module.exports = { startStream, stopStream }
