/* eslint-disable no-param-reassign */
const net = require('net');
const events = require('events');

const sockets = [];
let globalId = 0;

module.exports.init = (port) => new Promise((resolve) => {
  const event = new events.EventEmitter();

  // Remove disconnected client from sockets array
  const removeSocket = (socket) => {
    sockets.splice(sockets.indexOf(socket), 1);
  };

  const server = net.createServer((socket) => {
    // Increment
    globalId += 1;

    socket.username = `Socket${globalId}`;

    // When client sends data
    socket.on('data', (data) => {
      if (global.debug) {
        console.log('DEBUG', data.toString());
      }

      const spark = JSON.parse(data);

      event.emit(spark.type, {
        sparkId: spark.id,
        data: spark.data,
        socket,
      });
    });

    // When client leaves
    socket.on('end', () => {
      event.emit('logout', { socket });
      // Remove client from socket array
      removeSocket(socket);
    });

    // When socket gets errors
    socket.on('error', (error) => {
      console.log('Socket got problems: ', error.message);
    });
  });

  // Listening for any problems with the server
  server.on('error', (error) => {
    console.log('So we got problems!', error.message);
  });

  // Listen for a port to telnet to
  server.listen(port);

  server.on('listening', () => {
    console.log(`Server listening on Port: ${port}`);
    resolve(event);
  });
});
