const sprintService = require('../services/sprint.service');

const createSprint =  (req, res) => {
  return sprintService.createSprint(req.body)
    .then(sendCommandSucceeded(res, 'CreateSprint'))
    .catch((error) => {
      sendError(res, error)
    });
};

const sendCommandSucceeded = (res, command) => {
  return res.json({
    command: command || 'command'
  });
};

const sendError = (res, error) => {
  return res.status(500).json(error);
};

module.exports = {
  createSprint: createSprint
}