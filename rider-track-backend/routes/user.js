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

router.get("/:id/events", async (req, res) => {
    var pList = [];
    var eventList = [];

    var pList = Users.findById(req.params.id, function (err, user, test) {
        if (err) {
            console.log(err);
        } else {
            pList = user.participated_events;
            res.status(200).json(pList);
            /* for (var i = 0; i < pList.length; i++) {
                Event.findById(pList[i], function (err, event) {
                    var item = new Event();
                    if (err) {
                        console.log("Error Occured");
                        //res.status(500).json({'message':'Error while fecthing user history'});
                    } else {
                        item.event_name = event.event_name;
                        item.date_time = event.date_time;
                        item.duration = event.duration;
                        eventList.push(item);
                    }
                });
            } */
        }
    })

});
module.exports = router;