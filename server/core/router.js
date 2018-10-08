module.exports = (app) => {
  require('../lib/sprint/sprint.routes')(app);
  require('../lib/task/task.routes')(app);
};