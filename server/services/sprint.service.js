const Sprint = require('mongoose').model('Sprint');
const socketService = require('../services/socket.service');
const {curry, reject} = require('ramda');

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
  newSprint.name = `Sprint starting - ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  return newSprint.save()
    .then(sprint => sendEvent('SprintCreated', sprint))
}

const updateTaskPosition = (fromIndex, toIndex, list) => {
  return getCurrentSprint()
    .then(sprint => {
      let popped = sprint[list].splice(fromIndex, 1)[0];
      sprint[list].splice(toIndex, 0, popped);
      return sprint.save()
        .then(sendEvent('SprintTaskPositionUpdated', {list}));  // TODO: return something else?
    })
}

const updateTaskStatus = (fromStatus, toStatus, taskId) => {
  return getCurrentSprint()
    .then(sprint => {
      let taskIndex = sprint[fromStatus].findIndex((task) => task._id == taskId);
      if (taskIndex > -1) {
        let popped = sprint[fromStatus].splice(taskIndex, 1)[0];
        sprint[toStatus].push(popped);
        return sprint.save()
          .then(sendEvent('TaskStatusChanged', sprint));
      }
    })
}

const addTaskToCurrentSprint = (task) => {
  return getCurrentSprint()
    .then(addTask(task))
    .then(sendEvent('TaskAddedToSprint'))
}

const removeTaskFromCurrentSprint = (task) => {
  return getCurrentSprint()
    .then(removeTask(task))
    .then(sendEvent('TaskStatusChanged', {taskId: task}));
}

const removeTask = curry((taskId, sprint) => {
  let isTask = task => task == taskId;
  sprint.inProgress = reject(isTask, sprint.inProgress);
  sprint.notStarted = reject(isTask, sprint.notStarted);
  sprint.completed = reject(isTask, sprint.completed);
  sprint.cancelled = reject(isTask, sprint.cancelled);
  sprint.onHold = reject(isTask, sprint.onHold);
  return sprint.save();
});

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
  addTaskToCurrentSprint: addTaskToCurrentSprint,
  removeTaskFromCurrentSprint: removeTaskFromCurrentSprint,
  updateTaskPosition: updateTaskPosition,
  updateTaskStatus: updateTaskStatus,
};