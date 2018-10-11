const Task = require('mongoose').model('Task');
const Board = require('mongoose').model('Board');
const Sprint = require('mongoose').model('Sprint');
const { curry } = require('ramda');

const createTask = (task, board, sprint) => {
  let newTask = new Task(task);
  newTask.save()
    .then(placeTaskInBoard(board))
    .catch(sendError(res))
}

const placeTaskInBoard = curry((board, task) => {


});

const placeTaskInSpring = curry((task, sprint) => {

});

const sendError = curry((res, error) => {
  return res.status(500).json(error);
});