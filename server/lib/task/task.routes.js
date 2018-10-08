const tasks = require('./task.controller');

module.exports = (app) => {
  app.route('/v1/tasks')
    .post(tasks.create)
    .get(tasks.read);

  app.route('/v1/tasks/:taskId')
    .put(tasks.update)
    .get(tasks.show)
    .delete(tasks.remove);

  app.param('taskId', tasks.task);

};
