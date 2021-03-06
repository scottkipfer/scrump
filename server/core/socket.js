const socketio = require('socket.io');

const setup = (server) => {
  const io = socketio(server);
  io.on('connection', (client) => {
    console.log('Client Connected!');
    client.on('disconnect', () => {
      console.log('Client Disconnected!');
    });
    client.on('error', (error) => {
      console.log('err', error);
    });
  });

  module.exports.io = io;
  return io
};

module.exports = {
  setup: setup
}