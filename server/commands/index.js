const board = require('./board.commands');
const task = require('./task.commands');

module.exports = (app) => {

  app.route('/command/createTask')
    .post(task.createTask);

  app.route('/command/createBoard')
    .post(board.createBoard);

  app.route('/command/switchBoards')
    .post(board.switchBoards);
}