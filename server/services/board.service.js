const Board = require('mongoose').model('Board');
const { curry, reject } = require('ramda');
const socketService = require('../services/socket.service');
const sprintService = require('../services/sprint.service');

const createBoard = (board) => {
  let newBoard = new Board(board);
  return newBoard.save()
    .then(sendEvent('BoardCreated'));
};

const addTaskToBoard = (boardName, task) => {
  if (boardName === 'sprint') {
    return sprintService.addTaskToCurrentSprint(task);
  } else {
    return findBoardByName(boardName)
      .then(addTask(task))
      .then(sendEvent('TaskAddedToBoard', {boardName: boardName, task: task}))
  }
};

const addTasksToBoard = (boardName, tasks) => {
  if (boardName === 'sprint') {
    return sprintService.addTasksToCurrentSprint(tasks);
  } else {
    return findBoardByName(boardName)
      .then(addTasks(tasks))
      .then(sendEvent('TasksAddedToBoard', {boardName: boardName, tasks: tasks}))
  }
};

const removeTaskFromBoard = (boardName, taskId) => {
  if (boardName === 'sprint' || boardName === 'current') {
    return  sprintService.removeTaskFromCurrentSprint(taskId);
  } else {
    return findBoardByName(boardName)
      .then(removeTask(taskId))
      .then(sendEvent('TaskRemovedFromBoard', {boardName: boardName, taskId: taskId}))
  }
};

const removeTasksFromBoard = (boardName, tasks) => {
  if (boardName === 'sprint' || boardName === 'current') {
    return  sprintService.removeTasksFromCurrentSprint(tasks);
  } else {
    return findBoardByName(boardName)
      .then(removeTasks(tasks))
      .then(sendEvent('TasksRemovedFromBoard', {boardName: boardName, tasks: tasks}))
  }
};

const findBoardByName = (boardName) => {
  return Board.findOne({ name: boardName });
};

const addTask = curry((task, board) => {
  board.tasks.push(task);
  return board.save();
});

const addTasks = curry((tasks, board) => {
  tasks.forEach(task => {
    board.tasks.push(task._id);
  })
  return board.save();
})

const removeTask = curry((taskId, board) => {
  let isTask = task => task._id == taskId;
  board.tasks = reject(isTask, board.tasks);
  return board.save();
});

const removeTasks = curry((tasks, board) => {
  let isTask = task => {
    let ret = false;
    for (let i=0; i < tasks.length; i++) {
      if (tasks[i]._id == task._id) {
        ret = true;
        break;
      }
    }
    return ret;
  };
  board.tasks = reject(isTask, board.tasks);
  return board.save();
});

const updateTaskPosition = (board, fromIndex, toIndex) => {
    let popped = board.tasks.splice(fromIndex, 1)[0];
    board.tasks.splice(toIndex, 0, popped);
    return board.save()
      .then(sendEvent('TaskPositionUpdated', {boardName: board.name}));
}

const sendEvent = (event, payload) => {
  return socketService.sendEvent(event, payload);
};

module.exports = {
  createBoard: createBoard,
  findBoardByName: findBoardByName,
  addTaskToBoard: addTaskToBoard,
  addTasksToBoard: addTasksToBoard,
  removeTaskFromBoard: removeTaskFromBoard,
  removeTasksFromBoard: removeTasksFromBoard,
  updateTaskPosition: updateTaskPosition
};