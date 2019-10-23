/**
* Author: Shaunak Shah
* Date: 10/23/2019
* Task: 99
* Description: server/adapter to read data from an end device.
* Added the put operation to add the data to the API for every device.
*/

// Include Nodejs' net module.
const Net = require('net');
const https = require('http')
// The port on which the server is listening.
const port = 8080;

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function() {
    console.log('Server listening for connection requests on socket localhost:'+port);
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    socket.write('Hello, client.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        var message = chunk.toString().split(',');
        makePut(message);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});

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
