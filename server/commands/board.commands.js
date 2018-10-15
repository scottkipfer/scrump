const boardService = require('../services/board.service');
const {curry} = require('ramda');

const createBoard = (req, res) => {
  return boardService.createBoard(req.board)
    .then(sendCommandSucceded(res, 'Create Board'))
    .catch(sendError);
}

const switchBoards = (req, res) => {
  let {oldBoard, newBoard, taskId} = req.body;
  return boardService.removeTaskFromBoard(oldBoard, taskId)
    .then(boardService.addTaskToBoard(newBoard, taskId))
    .then(sendCommandSucceded(res, 'Switch Boards'))
    .catch(sendError);
}

const updateTaskPosition = (req, res) => {
  let {fromIndex, toIndex} = req.body;
  return boardService.updateTaskPosition(req.board, fromIndex, toIndex)
    .then(sendCommandSucceded(res, 'Update Task Position'))
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
  switchBoards: switchBoards,
  updateTaskPosition: updateTaskPosition
}