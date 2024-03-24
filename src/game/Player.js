const GameTable = require("./GameTable");
const User = require("../model/User");

class Player {
  constructor(currentTable, currentGame, user) {
    this.currentTable = currentTable;
    this.currentGame = currentGame;
    this.user = user;

    // this.gameSocket.on("connect", (socket) => {
    //   console.log(`플레이어 연결 : ${user.name} => ${socket.id}`);
    // });
  }
}

module.exports = Player;
