/* eslint-disable no-param-reassign */
const net = require('net');

const sockets = [];
const rooms = [];
const port = 5222;
let guestId = 0;

// Broadcast to others, excluding the sender
function broadcast(from, message) {
  // If there are no sockets, then don't broadcast any messages
  if (sockets.length === 0) {
    process.stdout.write('Everyone left the chat');
    return;
  }

  // If there are clients remaining then broadcast message
  sockets.forEach((socket) => {
    // Dont send any messages to the sender
    if (socket.nickname === from) return;

    socket.write(message);
  });
}

// Remove disconnected client from sockets array
function removeSocket(socket) {
  sockets.splice(sockets.indexOf(socket), 1);
}

const server = net.createServer((socket) => {
  // Increment
  guestId += 1;

  socket.nickname = `Guest${guestId}`;
  const clientName = socket.nickname;

  sockets.push(socket);

  // Log it to the server output
  console.log(`${clientName} joined this chat.`);

  // Welcome user to the socket
  socket.write('Welcome to telnet chat!\n');

  // Broadcast to others excluding this socket
  broadcast(clientName, `${clientName} joined this chat.\n`);

  // When client sends data
  socket.on('data', (data) => {
    const message = `${clientName}> ${data.toString()}`;

    broadcast(clientName, message);

    // Log it to the server output
    process.stdout.write(message);
  });

  // When client leaves
  socket.on('end', () => {
    const message = `${clientName} left this chat\n`;

    // Log it to the server output
    process.stdout.write(message);

    // Remove client from socket array
    removeSocket(socket);

    // Notify all clients
    broadcast(clientName, message);
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
// then in the terminal just run 'telnet localhost [port]'
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
