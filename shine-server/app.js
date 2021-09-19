const express = require('express');
const app = express();
const chalk = require('chalk');
const cors = require('cors');
const handler = require('./Handler');

const Room = require('./classes/Room');

const rooms = [];

const utils = require('./utils');

app.use(cors());
const options = {
  cors: {
    origin: 'http://localhost:4200',
  },
};

const server = require('http').Server(app);
const io = require('socket.io')(server, options);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

io.on('connection', function (socket) {
  const handshake = socket.id;
  
  let  game  = 'Orejitas';

  console.log(`${chalk.green(`Nuevo dispositivo: ${handshake}`)} entrado al juego ${game}`);

  // create a room
  socket.on('createRoom', (res) => {
    // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje  
    // Create new Room
    const room = new Room(
      res.data.name,
      res.data.description,
      res.data.maxPlayers,
      res.data.userNickname,
    );

    // Join admin to Room
    room.join(res.data.userNickname, room.id);

    // Add room to rooms list
    rooms.push(room);
    
    console.log(rooms);
    
    const response = {
      sparkId: 1,
      type: 'response',
      success: true,
      data: {
        createdId: room.id,
      },
    };

    socket.join(room.id)
    
    console.log(`${chalk.green(`Nuevo dispositivo: ${handshake}`)} entrado a la sala ${room.id}`);

    socket.emit('createRoom', response);
  })

  

  // Join room
  socket.on('joinRoom', (res) => {
    // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje  

    // Search if room exists
    const roomToJoin = rooms.find((room) => room.id === res.data.roomId);

    // Default response
    const response = {
      sparkId: 2,
      type: 'response',
      success: false,
      data: {
        message: 'Room does not exists',
      },
    };

    if (roomToJoin) {
      if (roomToJoin.countPlayers < roomToJoin.maxPlayers) {
      // Join to room
        roomToJoin.join(res.data.nickname, socket);

        // Create players info
        const players = roomToJoin.players.map((player, index) => ({
          index,
          nickname: player.name,
        }));

        // Add new response data
        response.success = true;
        response.data = {
          room: {
            name: roomToJoin.name,
            description: roomToJoin.description,
          },
          players,
        };

        // Broadcast to all room members
        utils.broadcast(socket, {
          type: 'join',
          data: {
            message: `${res.data.nickname} has joined to room`,
            players,
          },
        }, roomToJoin.players);

        // Add roomId to socket
        socket.joinedRoom = roomToJoin.id;
      } else {
        response.success = false;
        response.data.message = 'Room is already full';
      }
    }

    socket.emit('joinRoom', response);
  });

  socket.on('chat', (res) => {
    socket.to(res.data.roomId).emit('chat', res);
  });

  // handler  
  socket.on('evento', (res) => {
    // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje  

    socket.emit(game).emit('evento', res);

  })


  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(5000, function () {
  console.log('\n')
  console.log(`>> Socket listo y escuchando por el puerto: ${chalk.green('5000')}`)
})
