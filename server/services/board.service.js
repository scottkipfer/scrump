const Board = require('mongoose').model('Board');
const { curry } = require('ramda');

const addTaskToBoard = (boardName, task) => {
  return findBoardByName(boardName)
    .then(placeTaskInBoard(task))
    .catch(sendError)
}

const findBoardByName = (boardName) => {
  return Board.find({ name: boardName })
}

const placeTaskInBoard = curry((task, board) => {
  board.tasks.push(task);
  return baord.save();
});

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  addTaskToBoard: addTaskToBoard
}