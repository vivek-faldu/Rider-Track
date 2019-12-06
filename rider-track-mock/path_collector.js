/**
* Author: Shaunak Shah
* Date: 12/5/2019
* Task: 96
* Bug fixes for the event to display a proper track with limited 
* number of checkopoints so that the api of mapbox allows us.
* earlier the number of checkpoints were 410 which was being
* rejected by mapbox since it only allows 100 checkpoints to cover.
*/

const csv = require('fast-csv');
var fs = require("fs");

var id = 0;
var dataArr = [];

csv.parseFile('./my.csv', {headers: true})
.on('data', data => {

  if(data.Name == "AW" && id%20 == 0){
    var lt = data.Latitude;
    var lg = data.Longitude;
    var json = { "latitude": lt, "longitude": lg};
    dataArr.push(json);
  }
  id++;
})
.on("end", () => {
  fs.writeFile("./abc.txt", JSON.stringify(dataArr), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
  })
});

