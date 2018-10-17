const { curry } = require('ramda');
const Task = require('mongoose').model('Task');
const boardService = require('../services/board.service');
const sprintService = require('../services/sprint.service');
const socketService = require('../services/socket.service');

const createTask = (task, boardName) => {
  let newTask = new Task(task);
  return newTask.save()
    .then(placeTaskInBoardOrSprint(boardName));
};

const updateTask = (task) => {
  return task.save()
    .then(socketService.sendEvent('TaskUpdated', task));
}

const placeTaskInBoardOrSprint = curry((boardName, task) => {
  socketService.sendEvent('TaskCreated', task);
  if (boardName === 'sprint') {
    return sprintService.addTaskToCurrentSprint(task);
  } else {
    return boardService.addTaskToBoard(boardName || 'backlog', task);
  }
});

module.exports = {
  createTask: createTask,
  updateTask: updateTask
};