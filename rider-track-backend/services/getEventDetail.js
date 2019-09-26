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

