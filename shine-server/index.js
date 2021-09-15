const server = require('./server');
const handler = require('./Handler');

global.debug = false;

// Init server and send event to handler
server.init(5222)
  .then(handler);
