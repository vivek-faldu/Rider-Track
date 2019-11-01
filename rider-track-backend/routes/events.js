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

var {
    startEvent,
    stopEvent
} = require("../services/eventManager");
var {
    startStream,
    stopStream
} = require("../services/stream");

var bodyParser = require('body-parser').json();

router.get("/start/:id", (req, res) => {
    startStream(req.params.id)
    res.send("stream started")
});

router.get("/stop/:id", (req, res) => {
    stopStream(req.params.id)
    res.send("stream stopped")
});

router.get("/", async (req, res) => {
    
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var query;
    if (startDate === undefined || endDate === undefined)
        query = Event.find();
    else {
        query = Event.find({
            date_time: {
                $gt: startDate,
                $lt: endDate
            },
        });
    }
    query.exec(function (error, event) {
        if (error) {
            res.status(500).json("Internal Server Error");
        } else
            res.status(200).json(event);
    });
});

/** 
 * route to delete the list of event.
 * Author: Sai Saran Kandimalla
 * Task: #122
 */
router.delete("/delete/:id", (request, response) => {
    // removing all the instances of event_id in user_events schema.
    User_Event.collection.deleteMany({event_id: request.params.id});
    
    /** 
     * undoing participant registration before deleting the event in backend.
     */ 
    Event.findById({_id:request.params.id}).then((event) => {
        event.participants.map((participant) => {
            User.findById(participant.id).then((user) => {
                user.participated_events.filter((participated_event) => {
                    participated_event != request.params.id;
                });
            });
        });
    });

    Event.remove({_id:request.params.id}).then(res => {
        return response.status(200).json();
    }).catch((err) => {
        response.status(400).json({
            message: "the event delete request is unsuccessful",
            error: err
        });
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
            User.findById(req.body.creator_id, function (err, user) {
                if (err) {
                    send(err);
                }
                user.created_events.push(event._id);
                user.save().then(user => {
                    res.status(200).json({
                        status: 200,
                        message: 'Added successfully'
                    })
                })
            })
        })
        .catch(err => {
            res.status(400).send('Failed to create new event');
        });
});

// Event registration
// Edits row in event - adds participant to the given eventid
//Edits row in user - adds eventid to participatedevents
//adds new row in user-event

router.route("/:id").put(bodyParser, (req, res) => {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            res.status(500).json();
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

router.route("/start/:id").put(bodyParser, (req, res) => {
    startEvent(req, res);
})

router.route("/stop/:id").put(bodyParser, (req, res) => {
    stopEvent(req, res);
})


module.exports = router;