/**
* Author: Shaunak Shah
* Date: 10/17/2019
* Task: 99
* Description: server/adapter to read data from an end device.
* Added the put operation to add the data to the API for every device.
*/

var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var sleep = require('sleep');
const https = require('http')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', function() {
  var address = server.address();
 console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
 console.log(remote.address + ':' + remote.port +' - ' + message);
 var mes = message.toString().split(',');
 makePut(mes);
});

server.bind(PORT, HOST);

function makePut(mes){
	const data = JSON.stringify({
		"checkpoints":
		{
		    "lat": mes[1],
		    "long": mes[2],
		    "timestamp": new Date()
		}
	})

	const options = {
	  hostname: '127.0.0.1',
	  port: 4241,
	  path: '/api/user_events/'+mes[0],
	  method: 'PUT',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length
	  }
	}

	const req = https.request(options, (res) => {
	  res.on('data', (d) => {
	    process.stdout.write(d)
	  })
	})

	req.on('error', (error) => {
	  console.error(error)
	})

	req.write(data)
	req.end()
}
