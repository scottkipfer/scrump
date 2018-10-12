const taskService = require('../services/task.service.js');
const {curry} = require('ramda');

const createTask = (req, res) => {
  return taskService.createTask(req.task, req.boardName, req.sprintId)
    .then(sendCommandSucceeded(res, 'createTask'))
    .catch((error) => {
      sendError(res, error)});
};

const sendCommandSucceeded = (res, command) => {
  return res.json({
    command: command || 'command'
  });
};

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  createTask: createTask
};