module.exports.broadcast = (from, message, players = []) => {
  players.forEach((player) => {
    if (player.socket.username === from.username) return;

    player.socket.write(JSON.stringify(message));
  });
};

module.exports.getJoinedRoom = (socket, rooms) => rooms.find(
  (room) => room.id === socket.joinedRoom,
);
