/**
 * Author: Shilpa Bhat
 * Task: Unit tests for api calls
 * Task no: 46
 * Date: 09/22/2019
 */
const Event = require('../models/events');


module.exports.
    getEventsDetails = function (id) {
        return Event.findById(id, (err, issue) => {
            if (err)
                console.log(err);
            else
                res.json(issue);
        });
    }

