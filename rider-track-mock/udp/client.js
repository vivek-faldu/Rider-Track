/**
* Author: Shaunak Shah
* Date: 10/17/2019
* Task: 96
* Description: client to read data from a csv file and pretend to be a type of end device
* for specific users with that device. Mock of an end device data or 3rd party service data.
*/

var PORT = 33333;
var HOST = '127.0.0.1';
const csv = require('fast-csv');
var dgram = require('dgram');
var sleep = require('sleep');

var client = dgram.createSocket('udp4');

csv.parseFile('./pivot_users.csv', {headers: true})
.on('data', data => {
  const mes = data.id+','+data.Latitude+','+data.Longitude;
    client.send(mes, 0, mes.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
    });
})
.on("end", () => {
  client.close();
});
