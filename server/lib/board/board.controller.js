const Board = require('mongoose').model('Board');

const create = (req, res) => {
  let newBoard = new Board(req.body);
  newBoard.save().then((sprint) => {
    return res.status(200).json(sprint)
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const update = (req, res) => {
  let boardToUpdate = Object.assign(req.board, req.body);
  boardToUpdate.save().then(board => {
    return res.status(200).json(board)
  }).catch(err => {
    return res.status(500).json(err)
  });
};

const remove = (req, res) => {
  let board = req.board;
  board.delete().then(() => {
    return res.status(200)
  }).catch(err => {
    return res.status(500).json(err)
  })
};

const show = (req, res) => {
  return res.json(req.board);
};

const board = (req, res, next, name) => {
  Board.findOne({name: name}).populate('tasks').then(board => {
    if (!board) {
      return next({error: 'Board does not exist' })
    }
    req.board = board;
    next();
  }).catch(err => {
    return next(err);
  });
};

module.exports = {
  create: create,
  update: update,
  remove: remove,
  show: show,
  board: board
};
