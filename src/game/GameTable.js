const holdem = require("holdem");
const Player = require("./Player");

class GameTable {
  constructor(socketio, tableId) {
    this.socketio = socketio;
    this.tableId = tableId;
    this.players = [];
  }
}
