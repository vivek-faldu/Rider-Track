var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.get('/tcp', function(req, res) {
    fs.readFile('spot_users.csv', 'utf8', function (err, data) {
        res.send(data);
    });
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);