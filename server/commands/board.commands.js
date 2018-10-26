const boardService = require('../services/board.service');
const {curry} = require('ramda');

const createBoard = (req, res) => {
  return boardService.createBoard(req.board)
    .then(sendCommandSucceeded(res, 'Create Board'))
    .catch(sendError);
}

const switchBoards = (req, res) => {
  let {oldBoard, newBoard, task} = req.body;
  return boardService.removeTaskFromBoard(oldBoard, task._id)
    .then(boardService.addTaskToBoard(newBoard, task))
    .then(sendCommandSucceeded(res, 'Switch Boards'))
    .catch(sendError);
}

const updateTaskPosition = (req, res) => {
  let {fromIndex, toIndex} = req.body;
  return boardService.updateTaskPosition(req.board, fromIndex, toIndex)
    .then(sendCommandSucceeded(res, 'Update Task Position'))
    .catch(sendError);
}

const sendCommandSucceeded = curry((res, command) => {
  return res.status(200).json({
    command: command || 'command'
  });
});

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  createBoard: createBoard,
  switchBoards: switchBoards,
  updateTaskPosition: updateTaskPosition
}