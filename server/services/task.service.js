const { curry } = require('ramda');
const Task = require('mongoose').model('Task');
const boardService = require('../services/board.service.js');

const createTask = (task, boardName, sprintId) => {
  let newTask = new Task(task);
  return newTask.save()
    .then(placeTaskInBoardOrSprint(boardName, sprintId));
}

const updateTask = (task) => {
}

const placeTaskInBoardOrSprint = curry((boardName, sprintId, task) => {
  if (sprintId) {
    return placeTaskInSprint(sprintId, task);
  } else {
  return boardService.placeTaskInBoard(boardName || 'backlog', task);
  }
});

const placeTaskInSprint =(task, sprint) => {

};

module.exports = {
  createTask: createTask
}