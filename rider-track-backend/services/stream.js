/**
 * Author: Vivek Faldu
 * Author: Shilpa Bhat
 * Task: Create mock stream for testing pusher service
 * Task no: 98
 * Task no: 115
 * Date: 10/05/2019
 */
const Event = require('../models/events');
const User_Event = require("../models/user_events");

var _ = require('lodash');
var send = require("./pusher");
var handle;
var handles = new Map();

//send random
// function startStream(eventId) {
//     handle = setInterval(() => {
//         coordinates = [{ lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true), name: 'Shilpa', url: "abc" },
//         { lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true), name: 'Shilpa', url: "abc" },
//         { lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true), name: 'Shilpa', url: "abc" },
//         { lat: 33.42 + _.random(0, 1, true), long: -111.94 + _.random(0, 1, true), name: 'Shilpa', url: "abc" }]
//         send('my-rider-tracker', 'my-event', coordinates)
//     }, 1000);
//     handles.set("event_" + eventId + "_channel", handle);
//     console.log("stream started");
//     console.log("map size " + handles.size);
// }

function startStream(eventId) {
    users = new Array();
    Event.findById(eventId, function (err, event) {
        users = event.participants;
        handle = setInterval(() => {
            coordinates = [];
            //[{ id: "5d96e4e1e78f0b615d85cf34", name: "Shilpa" }]
            getCoordinatesFunction(users, eventId).then((res) => {
                coordinates = res;
                console.log("latest outside are " + JSON.stringify(coordinates));
                console.log("latest outside size " + coordinates.length);
                send('my-rider-tracker', 'my-event', coordinates);
                coordinates = [];
            })
        }, 5000);
        handles.set("event_" + eventId + "_channel", handle);
        console.log("stream started");
        console.log("map size " + handles.size);
    });
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

var getCoordinatesFunction = function getCoordinates(users, eventId) {
    return new Promise(function (resolve, reject) {
        latestCoordinates = new Array();
        count = 0;
        users.forEach((user) => {
            console.log("inside foreach");
            promisefun(user, eventId).then((res) => {
                console.log("ggggg " + JSON.stringify(res));
                latestCoordinates.push(res);
                count++;
                console.log("count is " + count);
                if (count == users.length) {
                    console.log("resolving " + latestCoordinates);
                    resolve(latestCoordinates);
                }
            });
        })
    })
}

var promisefun = function again(user, eventId) {
    return new Promise(function (resolve, reject) {
        User_Event.find({ event_id: eventId, user_id: user.id }, function (err, userEvent) {
        }).then((curr) => {
            ob = Object();
            cur = curr[0].checkpoints[curr[0].checkpoints.length - 1];
            ob.lat = cur.lat;
            ob.long = cur.long;
            ob.name = user.name;
            ob.url = "https://content.fortune.com/wp-content/uploads/2018/07/gettyimages-961697338.jpg";
            resolve(ob);
        })
    });
}

module.exports = { startStream, stopStream }
