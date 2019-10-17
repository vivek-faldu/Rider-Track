/**
* Author: Shaunak Shah
* Date: 10/17/2019
* Task: 96
* Description: Script to clean the original data provided by FindMeSpot.
* Basically adding unique device id for every user and segrigate based
* on the type of their device.
*/

const csv = require('fast-csv');

var id = 1;
var dataArr = {};
var main_spot = [];
var main_pivot = [];

csv.parseFile('./my.csv', {headers: true})
.on('data', data => {

  if(!(data.Name in dataArr)){
    dataArr[data.Name] = id;
    id++;
  }
  data.id = dataArr[data.Name];

  if(data.Source == 'Pivotel Push'){
    main_pivot.push(data);
  } else {
    main_spot.push(data);
  }
})
.on("end", () => {
  csv.writeToPath('./udp/pivot_users.csv', main_pivot);
  csv.writeToPath('./tcp/spot_users.csv', main_spot);
});


