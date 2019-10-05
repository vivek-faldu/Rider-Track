/**
 * Author: Janani Thiagarajan
 * Task: Create a backend api to fetch the list of registered events
 * Task no: 64
 * Date: 09/30/2019
 */
var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const Event = require('../models/events');

//const getRegisteredEvents = require('../services/getRegisteredEvents');

router.get("/:id/events", async (req, res) => {
    let uid = req.params.id;
    return fetchUserEvents(uid).then(function (user) {
        var myEventsList = [];
        myEventsList = user.participated_events;
        return fetchEventDetails(myEventsList).then(function (events) {
            return res.json(events);
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

module.exports = router;