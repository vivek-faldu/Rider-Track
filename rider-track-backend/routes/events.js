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

module.exports = router;