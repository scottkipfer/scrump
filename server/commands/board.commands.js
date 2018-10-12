const boardService = require('../services/board.service');
const {curry} = require('ramda');

const createBoard = (req, res) => {
  return boardService.createBoard(req.board)
    .then(sendCommandSucceded(res, 'Create Board'))
    .catch(sendError);
}

const switchBoards = (req, res) => {
  return boardService.removeTaskFromBoard(req.oldBoardName, req.taskId)
    .then(boardService.addTaskToBoard(req.newBoardName, req.taskId))
    .then(sendCommandSucceded(res, 'Switch Boards'))
    .catch(sendError);
}

const sendCommandSucceded = curry((res, command) => {
  return res.status(200).json({
    command: command || 'command'
  });
});

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  createBoard: createBoard,
  switchBoards: switchBoards
}