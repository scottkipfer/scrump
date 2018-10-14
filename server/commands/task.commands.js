const taskService = require('../services/task.service.js');
const {curry} = require('ramda');

const createTask = (req, res) => {
  return taskService.createTask(req.body.task, req.body.board, req.body.sprintId)
    .then(sendCommandSucceeded(res, 'CreateTask'))
    .catch((error) => {
      sendError(res, error)
    });
};

const updateTask = (req, res) => {
  let taskToUpdate = Object.assign(req.task, {
    ...req.body
  });
  return taskService.updateTask(taskToUpdate)
    .then(sendCommandSucceeded(res, 'UpdateTask'))
    .catch((error) => {
      sendError(res, error)
    });
}

const sendCommandSucceeded = (res, command) => {
  return res.json({
    command: command || 'command'
  });
};

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  createTask: createTask,
  updateTask: updateTask
};