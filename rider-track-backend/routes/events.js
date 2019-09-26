var express = require("express");
var router = express.Router();
const Event = require('../models/events');

var getEventDetails = require("../services/getEventDetail");
var bodyParser = require('body-parser').json();
router.get("/", async (req, res) => {
    Events
        .find()
        .exec(function (error, event) {
            return res.json(event);
        });
});

router.get("/:id", async (req, res) => {

    Event.findById(req.params.id, (err, event) => {
        if (err)
            console.log(err);
        else
            res.json(event);
    });

});

router.route('/add').post(bodyParser, (req, res) => {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({ 'event': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new event');
        });
});

module.exports = router;