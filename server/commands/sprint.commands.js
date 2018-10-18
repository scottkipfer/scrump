const sprintService = require('../services/sprint.service');
const {curry} = require('ramda');

const createSprint =  (req, res) => {
  return sprintService.createSprint(req.body)
    .then(sendCommandSucceeded(res, 'CreateSprint'))
    .catch((error) => sendError(res, error));
};

const updateSprintTaskPosition = (req, res) => {
  let {fromIndex, toIndex, list} = req.body;
  return sprintService.updateTaskPosition(fromIndex, toIndex, list)
    .then(sendCommandSucceeded(res, 'Update Sprint Task Position'))
    .catch((error) => sendError(res, error));
};

const updateTaskStatus = (req, res) => {
  let {fromStatus, toStatus, taskId} = req.body;
  return sprintService.updateTaskStatus(fromStatus, toStatus, taskId)
    .then(sendCommandSucceeded(res, 'Update Task Status'))
    .catch(error => sendError(res, error));
};

const sendCommandSucceeded = (res, command) => {
  return res.status(200).json({
    command: command || 'command'
  });
};

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});

module.exports = {
  createSprint: createSprint,
  updateSprintTaskPosition: updateSprintTaskPosition,
  updateTaskStatus: updateTaskStatus,
}