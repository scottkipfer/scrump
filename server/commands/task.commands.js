const taskService = require('../services/task.service.js');
const {curry} = require('ramda');

const createTask = (req, res) => {
  taskService.createTask(req.task, req.boardName, req.sprintId)
    .then(sendCommandSucceded(res, 'createTask'))
    .catch(sendError(res));
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
};