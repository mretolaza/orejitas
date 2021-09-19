const Room = require('../classes/Room');

const rooms = [];

const utils = require('../utils');

module.exports = (event) => {
  event.on('message', ({ data, socket }) => {
    if (socket.joinedRoom) {
      const joinedRoom = utils.getJoinedRoom(socket, rooms);

      const messageToSend = {
        type: 'message',
        data,
      };

      utils.broadcast(socket, messageToSend, joinedRoom.players);
    }
  });

  event.on('logout', ({ socket }) => {
    console.log('LOGOUT', socket.username);
  });

  event.on('createRoom', ({ sparkId, data: roomData, socket }) => {
    // Create new Room
    const room = new Room(
      roomData.name,
      roomData.description,
      roomData.maxPlayers,
      socket.username,
    );

    // Join admin to Room
    room.join(roomData.userNickname, socket);

    // Add room to rooms list
    rooms.push(room);
    
    console.log(rooms);
    
    const response = {
      sparkId,
      type: 'response',
      success: true,
      data: {
        createdId: room.id,
      },
    };

    socket.write(JSON.stringify(response));
  });

  event.on('join', ({ sparkId, data: joinData, socket }) => {
    // Search if room exists
    const roomToJoin = rooms.find((room) => room.id === joinData.roomId);

    // Default response
    const response = {
      sparkId,
      type: 'response',
      success: false,
      data: {
        message: 'Room does not exists',
      },
    };

    if (roomToJoin) {
      if (roomToJoin.countPlayers < roomToJoin.maxPlayers) {
      // Join to room
        roomToJoin.join(joinData.nickname, socket);

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
            message: `${joinData.nickname} has joined to room`,
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

    // Response to user
    socket.write(JSON.stringify(response));
  });

  event.on('movement', ({ sparkId, data: movement, socket }) => {
    console.log('MOVEMENT', sparkId, movement, socket.username);
  });
};
