const mongoose = require('mongoose');
const config = require('config');
const mongoLocation = 'mongodb://database/test';
const mongoOptions = {useNewUrlParser: true};

mongoose.Promise = Promise;
mongoose.connect(mongoLocation, mongoOptions).catch((err) => {
   console.warn(err);
});

process.on('SIGINT', () => {
   mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnection');
      process.exit(0);
   });
});

require('../lib/sprint/sprint.model.js');
require('../lib/task/task.model.js');
