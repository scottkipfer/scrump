const mongoose = require('mongoose');
const config = require('config');
const mongoLocation = 'mongodb://database/test';

mongoose.Promise = Promise;
mongoose.connect(mongoLocation).catch((err) => {
   console.warn(err);
});

process.on('SIGINT', () => {
   mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnection');
      process.exit(0);
   });
});