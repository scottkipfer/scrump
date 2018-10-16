const Sprint = require('mongoose').model('Sprint');
const socketService = require('../services/socket.service');

const _createSprint = (sprint) => {
  return getCurrentSprint()
    .then((currentSprint) => {
      let newSprint = new Sprint(sprint);     
      let {inProgress, notStarted, onHold} = currentSprint || {};
      newSprint.inProgess = inProgess;
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
    .then((sprint) => socketService.sendEvent('SprintCreated', sprint));
}

module.exports = {
  createSprint: createSprint,
  getCurrentSprint: getCurrentSprint
};