const Board = require('mongoose').model('Board');
const { curry, filter } = require('ramda');

const createBoard = (board) => {
  let newBoard = new Board(board);
  return newBoard.save()
    .then(sendAction('BoardCreated'));
};

const addTaskToBoard = (boardName, task) => {
  return findBoardByName(boardName)
    .then(addTask(task))
    .then(sendAction('TaskAddedToBoard', {boardName: boardName, task: task}))
};

const removeTaskFromBoard = (boardName, taskId) => {
  return findBoardByName(boardName)
    .then(removeTask(taskId))
    .then(sendAction('TaskRemovedFromBoard', {boardName: boardName, taskId: taskId}))
};

const findBoardByName = (boardName) => {
  return Board.find({ name: boardName })
};

const addTask = curry((task, board) => {
  board.tasks.push(task);
  return board.save();
});

const removeTask = curry((taskId, board) => {
  board.tasks = filter(task => task._id === taskId , board.tasks);
  return board.save();
});

const sendAction = curry((action, payload) => {
  // send event over socket here
});


module.exports = {
  createBoard: createBoard,
  addTaskToBoard: addTaskToBoard,
  removeTaskFromBoard: removeTaskFromBoard
};