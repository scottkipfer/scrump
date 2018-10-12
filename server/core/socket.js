const socketio = require('socket.io');

module.exports = (server) => {
  const io = socketio(server);

  io.on('connection', (client) => {
    console.log('Client Connected!');
    client.on('disconnect', () => {
      console.log('Client Disconnected!');
    })
  });

  return io;

}