const board = require('./board.controller');

module.exports = (app) => {
  app.route('/v1/boards')
      .post(board.create);

  app.route('/v1/boards/:boardName')
      .put(board.update)
      .get(board.show)
      .delete(board.remove);

  app.param('boardName', board.board);
};

