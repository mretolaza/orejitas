const server = require('./server');
const handler = require('./Handler');

global.debug = false;

// Init server and send event to handler
server.init(2222)
  .then(handler);
