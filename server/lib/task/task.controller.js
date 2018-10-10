const Task = require('mongoose').model('Task');
const Board = require('mongoose').model('Board');
const Sprint = require('mongoose').model('Sprint');

const create = (req, res) => {
  let newTask = new Task(req.body.task);
  newTask.save().then((task) => {
    if (req.body.sprint) {
      Sprint.findOne({_id: id}).then((sprint) => {
        sprint.notStarted.push(task);
        sprint.save().then(() => {
          return res.status(200).json(task);
        }).catch((err) => {
          return res.status(500).json(err);
        })
      });
    } else {
      Board.findOne({name: req.body.board || 'backlog'}) .then((board) => {
        board.tasks.push(task);
        board.save().then(() => {
          return res.status(200).json(task);
        }).catch((err) =>{
          return res.status(500).json(err);
        });
      });
    }
    return res.status(200).json(task)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const read = (req, res) => {
  let query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.board) query.board = req.query.board;
  if (req.query.sprint) query.sprintId = req.query.sprint;

  Task.find(query).then((tasks) => {
    return res.status(200).json(tasks)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const update = (req, res) => {
  let taskToUpdate = Object.assign(req.task, {
      ...req.body
  });
  taskToUpdate.save().then(task => {
    return res.status(200).json(task)
  }).catch(err => {
    return res.status(500).json(err)
  });
};

const remove = (req, res) => {
  let task = req.task;
  task.delete().then(() => {
    return res.status(200)
  }).catch(err => {
    return res.status(500).json(err)
  });
};

const show = (req, res) => {
  res.json(req.task);
};

const task = (req, res, next, id) => {
  Task.findOne({ _id: id }).then(task => {
    req.task = task;
    next();
  }).catch(err => {
    return next(err);
  });
};

module.exports = {
  create: create,
  read: read,
  update: update,
  remove: remove,
  show: show,
  task: task
};