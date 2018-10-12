const sendEvent = (eventName, payload) => {
  global.io.emit(eventName, payload);
};

module.exports = {
  sendEvent: sendEvent
};