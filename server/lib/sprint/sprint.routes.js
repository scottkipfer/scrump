const sprints = require('./sprint.controller');

module.exports = (app) => {
  app.route('/v1/sprints')
      .post(sprints.create)
      .get(sprints.read);

  app.route('/v1/sprints/:spintId')
      .put(sprints.update)
      .get(sprints.show)
      .delete(sprints.remove);

  app.route('/v1/currentSprint')
      .get(sprints.current);

  app.route('/v1/compelteSprint/:sprintId')
      .post(sprints.completeSprint);

  app.param('spirntId', sprints.sprint);
};

