const Sprint = require('mongoose').model('Sprint');
const Board = require('mongoose').model('Board');
const socketService = require('../services/socket.service');
const boardService = require('../services/board.service');
const { curry, reject } = require('ramda');

const completeSprint = (sprint) => {
  return getCurrentSprint()
    .then((currentSprint) => {
      let newSprint = new Sprint();
      let { inProgress, notStarted, onHold } = currentSprint || {};
      newSprint.inProgress = inProgress;
      newSprint.notStarted = notStarted;
      newSprint.onHold = onHold;
      newSprint.name = nameSprint();
      return Board.findOne({name: 'preplanning'}).then(board => {
        newSprint.notStarted = newSprint.notStarted.concat(board.tasks);
        console.log(newSprint);
        return newSprint.save()
          .then(spirnt => {return Board.findOne({name: 'preplanning'})})
          .then(board => {
            board.tasks = [];
            console.log(board);
            return board.save()
          })
      })
        .then((sprint) => socketService.sendEvent('SprintCreated', sprint))
        .then(completeCurrentSprint(currentSprint));
    });
};

const getCurrentSprint = () => {
  return Sprint.findOne({ active: true });
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
  newSprint.name = nameSprint();
  return newSprint.save()
    .then(sprint => sendEvent('SprintCreated', sprint))
}

const nameSprint = () => {
  let now = new Date();
  return `Sprint starting - ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
}

const updateTaskPosition = (fromIndex, toIndex, list) => {
  return getCurrentSprint()
    .then(sprint => {
      let popped = sprint[list].splice(fromIndex, 1)[0];
      sprint[list].splice(toIndex, 0, popped);
      return sprint.save()
        .then(sendEvent('SprintTaskPositionUpdated', { list, fromIndex, toIndex }));
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
          .then(sendEvent('TaskStatusChanged', {taskId, fromStatus, toStatus}));
      }
    })
}

const addTaskToCurrentSprint = (task) => {
  return getCurrentSprint()
    .then(addTask(task))
    .then(sendEvent('TaskAddedToSprint', { task }))
}

const removeTaskFromCurrentSprint = (task) => {
  return getCurrentSprint()
    .then(removeTask(task))
    .then(sendEvent('TaskRemovedFromSprint', { taskId: task }));
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
  completeSprint: completeSprint,
  getCurrentSprint: getCurrentSprint,
  addTaskToCurrentSprint: addTaskToCurrentSprint,
  removeTaskFromCurrentSprint: removeTaskFromCurrentSprint,
  updateTaskPosition: updateTaskPosition,
  updateTaskStatus: updateTaskStatus,
};