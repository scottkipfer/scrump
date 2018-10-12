const { curry } = require('ramda');
const Task = require('mongoose').model('Task');
const boardService = require('../services/board.service.js');

const createTask = (task, boardName, sprint) => {
  let newTask = new Task(task);
  return newTask.save()
    .then(placeTaskInBoardOrSprint(boardName))
    .then(sendCommandSucceded('Create Task'))
    .catch(sendError(res))
}

const placetaskInBoardOrSprint = curry((boardName, sprintId, task) => {
  if (sprintId) {
    return placeTaskInSprint(sprintId, task);
  } else {
    return placeTaskInBoard(boardName || 'backlog', task);
  }
});

const placeTaskInBoard = (boardName, task) => {
  return boardService.placeTaskInBoard(boardName, task);
};

const placeTaskInSprint =(task, sprint) => {

};

const sendCommandSucceded = curry((res, command) => {
  return res.status(200).json({
    command: command || 'command'
  });
});

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  createTask: createTask
}