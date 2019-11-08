'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks/start')
    .post(todoList.start_mocker);


  app.route('/tasks/stop')
    .post(todoList.stop_mocker);
};