const Board = require('mongoose').model('Board');
const { curry, reject } = require('ramda');
const socketService = require('../services/socket.service');
const sprintService = require('../services/sprint.service');

const createBoard = (board) => {
  let newBoard = new Board(board);
  return newBoard.save()
    .then(sendEvent('BoardCreated'));
};

const addTaskToBoard = (boardName, task) => {
  if (boardName === 'sprint') {
    return sprintService.addTaskToCurrentSprint(task);
  } else {
  return findBoardByName(boardName)
    .then(addTask(task))
    .then(sendEvent('TaskAddedToBoard', {boardName: boardName, task: task}))
  }
};

const removeTaskFromBoard = (boardName, taskId) => {
  if (boardName === 'sprint') {
    return  sprintService.removeTaskFromCurrentSprint(taskId);
  } else {
  return findBoardByName(boardName)
    .then(removeTask(taskId))
    .then(sendEvent('TaskRemovedFromBoard', {boardName: boardName, taskId: taskId}))
  }
};

const findBoardByName = (boardName) => {
  return Board.findOne({ name: boardName });
};

const addTask = curry((task, board) => {
  board.tasks.push(task);
  return board.save();
});

const removeTask = curry((taskId, board) => {
  let isTask = task => task._id == taskId;
  board.tasks = reject(isTask, board.tasks);
  return board.save();
});

const updateTaskPosition = (board, fromIndex, toIndex) => {
    let popped = board.tasks.splice(fromIndex, 1)[0];
    board.tasks.splice(toIndex, 0, popped);
    return board.save()
      .then(sendEvent('TaskPositionUpdated', {boardName: board.name}));
}

const sendEvent = (event, payload) => {
  return socketService.sendEvent(event, payload);
};

module.exports = {
  createBoard: createBoard,
  addTaskToBoard: addTaskToBoard,
  removeTaskFromBoard: removeTaskFromBoard,
  updateTaskPosition: updateTaskPosition
};