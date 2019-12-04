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


function startStream(eventId) {
    users = new Array();
    Event.findById(eventId, function (err, event) {
        users = event.participants;
        handle = setInterval(() => {
            coordinates = [];
            getCoordinatesFunction(users, eventId).then((res) => {
                coordinates = res;
                send("event_" + eventId + "_channel", 'my-event', coordinates);
                coordinates = [];
            })
        }, 5000);
        handles.set("event_" + eventId + "_channel", handle);
    });
}

function stopStream(eventId) {
    var handle = "event_" + eventId + "_channel";
    clearInterval(handles.get(handle));
    if (handles.has(handle)) {
        handles.delete(handle)
    }
}

var getCoordinatesFunction = function getCoordinates(users, eventId) {
    return new Promise(function (resolve, reject) {
        latestCoordinates = new Array();
        count = 0;
        console.log("users are");

        console.log(users);
        users.forEach((user) => {
            console.log("inside foreach");
            promisefun(user, eventId).then((res) => {
                console.log("ggggg " + JSON.stringify(res));
                latestCoordinates.push(res);
                count++;
                console.log("count is " + count);
                if (count == users.length) {
                    console.log("resolving " + latestCoordinates[0]);
                    resolve(latestCoordinates);
                }
            });
        })
    })
}

var promisefun = function again(user, eventId) {
    if (eventId == "5db26498b3cbfb4946b135db") {
        return new Promise(function (resolve, reject) {
            User_Event.find({ event_id: eventId, user_id: user.id }, function (err, userEvent) {
            }).then((curr) => {
                ob = Object();
                cur = curr[0].checkpoints[curr[0].checkpoints.length - 1];
                ob.latitude = parseFloat(cur.latitude);
                ob.longitude = parseFloat(cur.longitude);
                ob.name = user.name;
                ob.url = user.url;
                ob.id = user.id;
                resolve(ob);
            })
        });
    } else {
        return new Promise(function (resolve, reject) {
            User_Event.find({ event_id: eventId, user_id: user.id }, function (err, userEvent) {
            }).then((curr) => {
                ob = Object();
                cur = curr[0].checkpoints[curr[0].checkpoints.length - 1];
                // ob.latitude = 33.42 + _.random(0, 1, true);
                // ob.longitude = -111.94 + _.random(0, 1, true);
                var x = _.random(0, 1, true);
                console.log("randome vle");
                console.log(x);
                var precision = 100;
                var randomnum1 = Math.floor(Math.random(0, 1, true));
                var randomnum2 = Math.floor(Math.random(0, 1, true));
                ob.latitude = parseFloat(33.42 + randomnum1.toFixed(2));
                console.log("latitude is");
                console.log(ob.latitude);
                ob.longitude = parseFloat(-111.94 + randomnum2.toFixed(2));
                ob.name = user.name;
                ob.url = "";
                ob.id = user.id;
                console.log(JSON.stringify(ob));
                resolve(ob);
            })
        });
    }
}

module.exports = { startStream, stopStream }
