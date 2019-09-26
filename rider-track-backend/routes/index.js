var express = require('express');
var router = express.Router();
const Events = require('../models/events');

router.get("/", async (req, res) => {
    Events
        .find()
        .exec(function (error, event) {
            return res.json(event);
        });
});

module.exports = router;