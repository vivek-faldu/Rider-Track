/**
 * Author: Shaunak Shah
 * Task: Put call for device data to update user events table
 *        with checkpoints by specific event and device id.
 * Task no: 100
 * Date: 10/21/2019
 */
var express = require("express");
var router = express.Router();
const User = require("../models/users");
const User_Event = require("../models/user_events");

var bodyParser = require('body-parser').json();

router.route("/:id").put(bodyParser, (req, res) => {
  fetchUserEvents(req.params.id).then(function (events) {
    fetchUser(events.user_id).then(function (user) {
      fetchLiveUserEvent(user._id, user.live_event).then(function (live) {
        var checks = req.body.checkpoints;
        live.checkpoints.push({lat: checks.lat, long: checks.long, timestamp: checks.timestamp});
        live.save().then(user_event => {
          res.status(200).json({
            status: 200,
            event: "Checkpoints added successfully"
          });
        }).catch(err => {
            res.status(400).send(err);
        });
      })
    });
  })
});

function fetchUserEvents(id){
  var query = User_Event.findOne({
    device_id: {
      $in: id
    },
  });
  return query.exec().then(function (events) {
    return events;
  })
}

function fetchUser(id){
  var query = User.findById(id);

  return query.exec().then(function (user) {
    return user;
  })
}

function fetchLiveUserEvent(uid, eid) {
  var query = User_Event.findOne({
    user_id: {
      $in: uid
    },
    event_id: {
      $in: eid
    }
  });

  return query;
  return query.exec().then(function (userEvent) {
    return userEvent;
  })
}

module.exports = router;
