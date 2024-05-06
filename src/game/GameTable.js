const holdem = require("holdem");
const Player = require("./Player");
const Game = require("./Game");

class GameTable {
  constructor(tableSocket, gameSocket, tableId) {
    this.tableSocket = tableSocket;
    this.gameSocket = gameSocket;
    this.tableId = tableId;

    this.players = new Map();
    this.currentGame = undefined;

    this.tableSocket.on("connection", (socket) => {
      socket.on("joinTable", { user });
    });
  }

  addPlayer(user) {
    const newPlayer = new Player(this.tableSocket, this.gameSocket, user);
    this.players.set(user.nickname, newPlayer);

    setTimeout(() => {
      this.tableSocket.emit("message", this.sendMessage(user.nickname, msg));
    }, 500);
  }

  startGame() {
    this.currentGame = new Game(this.gameSocket);
  }

  sendMessage(nickname, msg) {
    return { nickname: nickname, msg: msg };
  }
}

module.exports = GameTable;
