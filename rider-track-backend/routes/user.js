/**
 * Author: Janani Thiagarajan
 * Task: Create a backend api to fetch the list of registered events
 * Task no: 64
 * Date: 09/30/2019
 */
var express = require('express');
var router = express.Router();
const Users = require('../models/users');

router.get("/:id/events", async (req, res) => {

    Users.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
        } else
            console.log(user);
        res.json(user);
    });
});
module.exports = router;