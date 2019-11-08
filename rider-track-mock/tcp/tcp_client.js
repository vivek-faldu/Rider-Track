/**
* Author: Shaunak Shah
* Date: 10/19/2019
* Task: 97
* Description: client to read data from a csv file and pretend to be a type of end device
* for specific users with that device. Mock of an end device data or 3rd party service data.
*/

var PORT = 8080;
var HOST = '127.0.0.1';
const csv = require('fast-csv');
var net = require('net');
var sleep = require('sleep');

var path = require('path');
var appDir = path.dirname(require.main.filename);

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('Connected');
  });

csv.parseFile(appDir+'/spot_users.csv', {headers: true})
.on('data', data => {
  const mes = data.id+','+data.Latitude+','+data.Longitude;
  client.write(mes);
  sleep.sleep(1);
})
.on("end", () => {
  client.destroy();
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', function(ex) {
  console.log("handled error");
  console.log(ex);
});
