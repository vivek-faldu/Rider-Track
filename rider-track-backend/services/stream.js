/**
 * Author: Vivek Faldu
 * Author: Shilpa Bhat
 * Task: Create mock stream for testing pusher service
 * Task no: 98
 * Task no: 115
 * Date: 10/05/2019
 */
const Event = require('../models/events');
const User_Event = require("../models/user_events");

var _ = require('lodash');
var send = require("./pusher");
var handle;
var handles = new Map();

 function startStream(){
    handle =  setInterval(() => {
        
        coordinates = [{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true),name: 'Mark', url: 'https://content.fortune.com/wp-content/uploads/2018/07/gettyimages-961697338.jpg'},{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true), name: 'Douglas Johnson', url: 'https://qph.fs.quoracdn.net/main-qimg-8c5ea2930025b21f9a394cf0a3b95759'},{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true),name: 'Shilpa', url: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg'},{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true),name: 'Matt', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg/220px-Matt_LeBlanc_as_Joey_Tribbiani.jpg'}]
        send('my-rider-tracker','my-event',coordinates)    
    }, 1000);
}

var promisefun = function again(user, eventId) {
    return new Promise(function (resolve, reject) {
        User_Event.find({ event_id: eventId, user_id: user.id }, function (err, userEvent) {
        }).then((curr) => {
            ob = Object();
            cur = curr[0].checkpoints[curr[0].checkpoints.length - 1];
            ob.lat = cur.lat;
            ob.long = cur.long;
            ob.name = user.name;
            ob.url = "https://content.fortune.com/wp-content/uploads/2018/07/gettyimages-961697338.jpg";
            resolve(ob);
        })
    });
}

module.exports = { startStream, stopStream }
