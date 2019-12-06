/**
 * Author: Vivek Faldu
 * Task: Create pusher service for backend
 * Task no: 70
 * Date: 10/05/2019
 */

var Pusher = require('pusher');
var channels_client = new Pusher({
    appId: '874827',
    key: 'd3d42763648c6c9ca5d4',
    secret: 'c08ff4f50b619cc50d4f',
    cluster: 'us3',
    encrypted: true
  });

const send = (channel,event,data)=>{
    channels_client.trigger(channel, event, {
        "coordinates": data
      });

}

module.exports = send;