const { io } = require('../core/socket');

const sendEvent = (eventName, payload) => {
  return io.emit(eventName, payload);
};

module.exports = {
  sendEvent: sendEvent
};