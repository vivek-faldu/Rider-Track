/**
* Author: Shaunak Shah
* Date: 12/1/2019
* Task: 96
* Description: Script to clean the original data provided by FindMeSpot.
* Basically adding unique device id for every user and segrigate based
* on the type of their device.
*/

const csv = require('fast-csv');
var fs = require("fs");

var id = 1;
var dataArr = [];

csv.parseFile('./my.csv', {headers: true})
.on('data', data => {

  if(data.Name == "AW"){
    var lt = data.Latitude;
    var lg = data.Longitude;
    var json = { "latitude": lt, "longitude": lg};
    dataArr.push(json);
  }
})
.on("end", () => {
  // dataArr += "]";
  fs.writeFile("./abc.txt", JSON.stringify(dataArr), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
  })
});

// console.log(dataArr);

