const taskService = require('../services/task.service.js');
const boardService = require('../services/board.service.js');
const {curry} = require('ramda');

const createTask = (req, res) => {
  return taskService.createTask(req.body.task, req.body.board)
    .then(sendCommandSucceeded(res, 'CreateTask'))
    .catch((error) => {
      sendError(res, error);
    });
};

const updateTask = (req, res) => {
  req.task[req.body.field] = req.body.value;
  return taskService.updateTask(req.task, req.body.field)
    .then(sendCommandSucceeded(res, 'UpdateTask'))
    .catch((error) => {
      sendError(res, error);
    });
}

const deleteTasks = (req, res) => {
  let tasks = req.body.tasks;
  let deletions = [];
  
  if (tasks.length) {
    tasks.forEach(task => {
      deletions.push(taskService.deleteTask(task)); 
    });
  }

  return boardService.removeTasksFromBoard(req.body.currentView, tasks)
    .then(Promise.all(deletions))
    .then(sendCommandSucceeded(res, 'DeleteTasks'))
    .catch((error) => {
      sendError(res, error);
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
  updateTask: updateTask,
  deleteTasks: deleteTasks
};