const { io } = require('../core/socket');

const sendEvent = (eventName, payload) => {
  console.log("sending socketIO event ", eventName, payload);
  return io.emit(eventName, payload);
};

module.exports = {
  sendEvent: sendEvent
};