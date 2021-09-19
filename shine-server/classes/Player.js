module.exports = class Player {
  constructor(name, socket, room) {
    this.name = name;
    this.socket = socket;
    this.room = room;
    this.cards = null;
    this.turn = false;
  }

  setTurn(){
    this.turn = true;
  }
};
