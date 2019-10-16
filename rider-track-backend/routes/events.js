/**
 * Author: Shilpa Bhat
 * Author: Janani Thiagarajan
 * Task: Get and Post calls for event
 * Task no: 45,46,47
 * Date: 09/20/2019
 */
var express = require("express");
var router = express.Router();
const Event = require('../models/events');
const User = require("../models/users");
const User_Event = require("../models/user_events");
var getEventDetails = require("../services/getEventDetail");
var {
    startStream,
    stopStream
} = require("../services/stream");

var bodyParser = require('body-parser').json();

router.get("/start", (req, res) => {
    startStream()
    res.send("stream started")
});

router.get("/stop", (req, res) => {
    stopStream()
    res.send("stream stopped")
});

router.get("/", async (req, res) => {
    Event
        .find()
        .exec(function (error, event) {
            if (error) {
                res.status(500).json("Internal Server Error");
            } else
                res.status(200).json(event);
        });
});

router.get("/:id", async (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            //console.log(err);
            res.status(404).json();
        } else
            res.json(event);
    });

});

router.route('/').post(bodyParser, (req, res) => {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({
                status: 200,
                message: 'Added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new event');
        });
});

router.route("/:id").put(bodyParser, (req, res) => {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            send(err);
        }
        event.participants.push({ id: req.body.userId, name: req.body.name });
        event
            .save()
            .then(event => {
                User.findById(req.body.userId, function (err, user) {
                    if (err) {
                        send(err);
                    }
                    user.participated_events.push(req.params.id);
                    user.save().then(user => {
                        let user_event = new User_Event();
                        user_event.user_id = req.body.userId;
                        user_event.event_id = req.params.id;
                        user_event.nick_name = req.body.nick_name;
                        user_event.email_id = req.body.email_id;
                        user_event.device_id = req.body.device_id;
                        user_event.country = req.body.country;
                        user_event.timezone = req.body.timezone;
                        user_event.provider = req.body.provider;
                        user_event.save().then(user_event => {
                            res.status(200).json({
                                status: 200,
                                event: "Registered successfully"
                            });
                        }).catch(err => {
                            res.status(400).send("Failed to register");
                        });
                    })
                })
            })
    });
});



module.exports = router;