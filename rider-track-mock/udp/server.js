/**
* Author: Shaunak Shah
* Date: 10/17/2019
* Task: 96
* Description: server/adapter to read data from an end device.
* Currently just a dummy script to make sure that the client is working.
* will connect API on receive so that the data goes to DB.
*/

var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
 console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
 console.log(remote.address + ':' + remote.port +' - ' + message);
});

server.bind(PORT, HOST);
