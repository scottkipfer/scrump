const Sprint = require('mongoose').model('Sprint');
const Board = require('mongoose').model('Board');

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
  if (req.query.active) {
    query.active = req.query.active;
  }
  let options = {
    limit: 10,
    sort: {
        created: -1 //Sort by Date Added DESC
    }
  }
  Sprint.find(query, null, options).populate('completed cancelled').then((sprints) => {
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

const current = (req, res) => {
  Sprint.findOne({active: true}).populate('notStarted completed onHold inProgress cancelled').then(sprint => {
    if (!sprint) {
      return res.status(404).send({error: 'No active sprints'});
    }
    req.sprint = sprint;
    res.status(200).json(sprint);
  });
};

const completeSprint = (req, res) => {
  let sprint = req.sprint;
  let copySprint = new Sprint();
  copySprint.inProgress = sprint.inProgress;
  copySprint.onHold = sprint.onHold;
  copySprint.notStarted = sprint.notStarted;
  sprint.active = false;
  sprint.inProgress = [];
  sprint.onHold = [];
  sprint.notStarted = [];
  sprint.completedDate = Date.now();
  Board.findOne({name: 'preplanning'}).then((board) => {
    sprint.save().then(() => {
      copySprint.notStarted.push(board.tasks);
      copySprint.save().then((sprint) => {
        return res.status(200).json(sprint);
      })
    }).catch((err) => {
      return res.status(500).json(err);
    });
  }).catch((err) => {
    return res.status(500).json(err);
  })
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
  sprint: sprint,
  current: current,
  completeSprint: completeSprint
};
