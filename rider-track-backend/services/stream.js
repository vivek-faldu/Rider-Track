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
        
        coordinates = [{lat:33.42+ _.random(0, 0.01, true),long:-111.94+ _.random(0, 0.1, true),name: 'Mark', url: 'https://content.fortune.com/wp-content/uploads/2018/07/gettyimages-961697338.jpg'},{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true), name: 'Douglas Johnson', url: 'https://qph.fs.quoracdn.net/main-qimg-8c5ea2930025b21f9a394cf0a3b95759'},{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true),name: 'Shilpa', url: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg'},{lat:33.42+ _.random(0, 0.0001, true),long:-111.94+ _.random(0, 0.0001, true),name: 'Matt', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg/220px-Matt_LeBlanc_as_Joey_Tribbiani.jpg'}]
        send(`event_dn_channel`,'my-event',coordinates)    
    }, 1000);
}

 function stopStream(){
    clearInterval(handle);
}

module.exports = {startStream,stopStream}
