const Sprint = require('mongoose').model('Sprint');
const socketService = require('../services/socket.service');
const {curry} = require('ramda');

const _createSprint = (sprint) => {
  return getCurrentSprint()
    .then((currentSprint) => {
      let newSprint = new Sprint(sprint);     
      let {inProgress, notStarted, onHold} = currentSprint || {};
      newSprint.inProgess = inProgress;
      newSprint.notStarted = notStarted;
      newSprint.onHold = onHold;
      return newSprint.save()
        .then((sprint) => socketService.sendEvent('SprintCreated', sprint))
        .then(completeCurrentSprint(currentSprint));
    });
};

const getCurrentSprint = () => {
  return Sprint.findOne({active: true});
}

const completeCurrentSprint = (currentSprint) => {
  currentSprint.inProgess = [];
  currentSprint.onHold = [];
  currentSprint.notStarted = [];
  currentSprint.active = false;
  return currentSprint.save()
    .then((sprint) => socketService.sendEvent('SprintCompleted', sprint));
}

const createSprint = () => {
  let newSprint = new Sprint();
  let now = new Date();
  newSprint.name = `Sprint starting - ${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`;
  return newSprint.save()
    .then(sprint => sendEvent('SprintCreated', sprint))
}

const addTaskToCurrentSprint = (task) => {
  return getCurrentSprint()
    .then(addTask(task))
    .then(sendEvent('TaskAddedToSprint'))
}

const sendEvent = curry((event, payload) => {
  return socketService.sendEvent(event, payload);
});

const addTask = curry((task, sprint) => {
  sprint.notStarted.push(task);
  return sprint.save();
})

module.exports = {
  createSprint: createSprint,
  getCurrentSprint: getCurrentSprint,
  addTaskToCurrentSprint: addTaskToCurrentSprint
};