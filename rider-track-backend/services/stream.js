/**
 * Author: Vivek Faldu
 * Task: Create mock stream for testing pusher service
 * Task no: 73
 * Date: 10/05/2019
 */

var _ = require('lodash');
var send = require("./pusher");   
var handle;

 function startStream(){
    handle =  setInterval(() => {
        coordinates = [{lat:33.42+ _.random(0, 1, true),long:-111.94+ _.random(0, 1, true)},{lat:33.42+ _.random(0, 1, true),long:-111.94+ _.random(0, 1, true)},{lat:33.42+ _.random(0, 1, true),long:-111.94+ _.random(0, 1, true)},{lat:33.42+ _.random(0, 1, true),long:-111.94+ _.random(0, 1, true)}]
        send('my-rider-tracker','my-event',coordinates)    
    }, 1000);
}

 function stopStream(){
    clearInterval(handle);
}

module.exports = {startStream,stopStream}
