const Task = require('mongoose').model('Task');

const create = (req, res) => {
  let newTask = new Task(req.body);
  newTask.save().then((task) => {
    return res.status(200).json(task)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const read = (req, res) => {
  let query = {};
  query.status = req.body.status;
  query.board = req.body.board;

  Task.find(query).then((tasks) => {
    return res.status(200).json(tasks)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const update = (req, res) => {
  let taskToUpdate = {
      ...req.task,
      ...req.body
  };
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
  })
};

const show = (req, res) => {
  res.json(req.task);
};

const task = (req, res, next, id) => {
  Task.findOne(id).then(task => {
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