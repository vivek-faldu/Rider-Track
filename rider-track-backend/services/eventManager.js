/**
 * Author: Shilpa Bhat
 * Task: Functions to start and stop an event
 * Task no: 111
 * Date: 10/17/2019
 */

var express = require("express");
var router = express.Router();
const Event = require('../models/events');
const User = require("../models/users");
const User_Event = require("../models/user_events");

var {
    startStream,
    stopStream
} = require("../services/stream");
function startEvent(req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return err;
        }
        event.status = 'Live';
        event.save().then(() => {
            participants = new Array();
            participants = event.participants;
            if (participants.length > 0) {
                participants.forEach(participant => {
                    User.findById(participant.id, function (err, user) {
                        user.live_event = req.params.id;
                        user.save().then(() => {
                            res.status(200).json({
                                status: 200,
                                event: "Started successfully"
                            });
                        }).catch((err) => {
                            throw err;
                            // res.status(400).send("Failed to Start the event");
                        })
                    })
                });
            }
        })
    })
    startStream(req.params.id);

}

function stopEvent(req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            send(err);
        }
        event.status = "Completed";
        event.save().then(() => {
            participants = new Array();
            participants = event.participants;
            if (participants.length > 0) {
                participants.forEach(participant => {
                    User.findById(participant.id, function (err, user) {
                        user.live_event = "";
                        user.save().then(() => {
                            stopStream(req.params.id);
                            res.status(200).json({
                                status: 200,
                                event: "Stopped successfully"
                            });
                        }).catch(() => {
                            res.status(400).send("Failed to stop the event");
                        })
                    })
                });
            }
        })
    })
}

module.exports = { startEvent, stopEvent };