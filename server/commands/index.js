const board = require('./board.commands');
const task = require('./task.commands');
const sprint = require('./sprint.commands');

module.exports = (app) => {

  app.route('/command/createTask')
    .post(task.createTask);

  app.route('/command/updateTask/:taskId')
    .post(task.updateTask);

  app.route('/command/createBoard')
    .post(board.createBoard);

  app.route('/command/switchBoards')
    .post(board.switchBoards);

  app.route('/command/updateTaskPosition/:boardName')
    .post(board.updateTaskPosition);

  app.route('/command/createSprint')
    .post(sprint.createSprint);

}