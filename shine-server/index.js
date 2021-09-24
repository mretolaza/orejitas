const server = require('./server');
const handler = require('./Handler');
const webSocket = require('./app');

global.debug = false;

// Init server and send event to handler
server.init(5222)
  .then(handler);
webSocket.init();
