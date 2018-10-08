const Sprint = require('mongoose').model('Sprint');

const create = (req, res) => {
  let newSprint = new Sprint(req.body);
  newSprint.save().then((sprint) => {
    return res.status(200).json(sprint)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const read = (req, res) => {
  let query = {};
  query.active = req.body.active;

  Sprint.find(query).then((sprints) => {
    return res.status(200).json(sprints)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const update = (req, res) => {
  let sprintToUpdate = {
    ...req.sprint,
    ...req.body
  };
  sprintToUpdate.save().then(sprint => {
    return res.status(200).json(sprint)
  }).catch(err => {
    return res.status(500).json(err)
  });
};

const remove = (req, res) => {
  let sprint = req.sprint;
  sprint.delete().then(() => {
    return res.status(200)
  }).catch(err => {
    return res.status(500).json(err)
  })
};

const show = (req, res) => {
  res.json(req.sprint);
};

const sprint = (req, res, next, id) => {
  Sprint.findOne(id).then(sprint => {
    req.sprint = sprint;
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
  sprint: sprint
};
