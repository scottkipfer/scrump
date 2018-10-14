const Board = require('mongoose').model('Board');
const { curry, reject } = require('ramda');
const socketService = require('../services/socket.service');

const createBoard = (board) => {
  let newBoard = new Board(board);
  return newBoard.save()
    .then(sendEvent('BoardCreated'));
};

const addTaskToBoard = (boardName, task) => {
  return findBoardByName(boardName)
    .then(addTask(task))
    .then(sendEvent('TaskAddedToBoard', {boardName: boardName, task: task}))
};

const removeTaskFromBoard = (boardName, taskId) => {
  return findBoardByName(boardName)
    .then(removeTask(taskId))
    .then(sendEvent('TaskRemovedFromBoard', {boardName: boardName, taskId: taskId}))
};

const findBoardByName = (boardName) => {
  return Board.findOne({ name: boardName });
};

const addTask = curry((task, board) => {
  board.tasks.push(task);
  return board.save();
});

const removeTask = curry((taskId, board) => {
  console.log('board.tasks', board.tasks);
  let isTask = task => task._id == taskId;
  board.tasks = reject(isTask, board.tasks);
  console.log('new board.tasks', board.tasks);
  return board.save();
});

const sendEvent = (event, payload) => {
  return socketService.sendEvent(event, payload);
};

module.exports = {
  createBoard: createBoard,
  addTaskToBoard: addTaskToBoard,
  removeTaskFromBoard: removeTaskFromBoard
};