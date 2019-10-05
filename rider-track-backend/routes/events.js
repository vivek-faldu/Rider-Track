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
var getEventDetails = require("../services/getEventDetail");
var {startStream,stopStream} = require("../services/stream");

var bodyParser = require('body-parser').json();

router.get("/start", (req,res) => {
    startStream()
    res.send("stream started")
});

router.get("/stop", (req,res) => {
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
        }
        else
            res.json(event);
    });

});

router.route('/add').post(bodyParser, (req, res) => {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({
                'event': 'Added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new event');
        });
});




module.exports = router;