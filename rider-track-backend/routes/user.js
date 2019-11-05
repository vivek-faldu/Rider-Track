/**
 * Author: Janani Thiagarajan
 * Task: Create a backend api to fetch the list of registered events
 * Task no: 64
 * Date: 09/30/2019
 * 
 * Task: Create a backend api to fetch the specific details of an event
 *          for a participant
 * Task no: 83
 * Date: 10/07/2019
 * 
 * Task: Create a backend api to update specific details of a user
 * Task no: 149
 * Date: 11/05/2019
 * 
 */

var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const Event = require('../models/events');
const UserEvent = require('../models/user_events');

router.put("/profile/:id", async (req, res) => {
    let uid = req.params.id;
    Users.findById(uid, (err, user) => {
        if (err) {
            res.status(500).json("Internal Server Error");
        } else {
            if (user == null) {
                res.status(404).json("User not found");
            }
            else {
                user.email = req.body.email;
                user.username = req.body.username;
                user.save().then(newuser => {
                    res.status(200).json({
                        status: 200,
                        event: "User information has been updated sucessfully"
                    });
                }).catch(err => {
                    res.status(500).send("Failed to update the user info");
                });
            }
        }
    });
});

router.get("/events", async (req, res) => {
    let uid = req.query.userid;
    return fetchUserEvents(uid).then(function (user) {
        var myEventsList = [];
        myEventsList = user.participated_events;
        myCreatedEventsList = user.created_events;
        var result;
        return fetchEventDetails(myEventsList).then(function (events) {
            result = {
                'participated_events': events
            };
            return fetchEventDetails(myCreatedEventsList).then(function (events) {
                result.created_events = events;
                return res.json(result);
            })
        })
    })
});

router.get("/eventdetail", async (req, res) => {
    let uid = req.query.userid;
    let eventId = req.query.eventid;
    var result;
    return fetchEventDetail(eventId).then(function (myEvent) {
        result = {
            'event_name': myEvent.event_name
        };
        result.event_description = myEvent.event_description;
        result.date_time = myEvent.date_time;
        result.duration = myEvent.duration;
        result.status = myEvent.status;
        result.max_participant = myEvent.max_participant;
        return fetchUserCheckpoints(uid, eventId).then(function (userEvent) {
            result.checkpoints = userEvent.checkpoints;

            return res.json(result);
        })
    })
});

function fetchUserEvents(myID) {
    var details = new Users();
    var query = Users.findById(myID);
    return query.exec().then(function (users) {
        details.user_id = users.user_id;
        details.email = users.email;
        details.participated_events = users.participated_events;
        details.created_events = users.created_events;
        return details;
    })
}


function fetchEventDetails(pList) {
    var query = Event.find({
        _id: {
            $in: pList
        }
    });
    return query.exec().then(function (events) {
        return events;
    })
}

function fetchEventDetail(eventId) {
    var myEvent = new Event();
    var query = Event.findById(eventId);
    return query.exec().then(function (event) {
        myEvent.event_name = event.event_name;
        myEvent.event_description = event.event_description;
        myEvent.date_time = event.date_time;
        myEvent.duration = event.duration;
        myEvent.status = event.status;
        myEvent.max_participant = event.max_participant;
        return myEvent;
    })
}


function fetchUserCheckpoints(uid, eid) {
    var item = new UserEvent();
    var query = UserEvent.find({
        user_id: {
            $in: uid
        },
        event_id: {
            $in: eid
        }
    });
    return query.exec().then(function (userEvent) {
        item.user_id = userEvent[0].user_id;
        item.event_id = userEvent[0].event_id;
        item.checkpoints = userEvent[0].checkpoints;
        return item;
    })
}

module.exports = router;