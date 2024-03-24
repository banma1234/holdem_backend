import tableManager from "./TableManager";
const holdem = require("holdem");
const Player = require("./Player");
const CurrentGame = require("./CurrentGame");

class GameTable {
  constructor(tableSocket, gameSocket, tableId) {
    this.tableSocket = tableSocket;
    this.gameSocket = gameSocket;
    this.tableId = tableId;

    this.players = new Map();
    this.currentGame = new CurrentGame(this.gameSocket);
  }

  addPlayer(user) {
    const newPlayer = new Player(
      tableManager.getTable(this.tableId),
      this.currentGame,
      user
    );
    this.players.set(user.email, newPlayer);
  }

  startGame() {
    this.currentGame.joinPlayerToGame(this.players);
  }
}

module.exports = GameTable;
