class Player {
  constructor(tableSocket, gameSocket, user) {
    this.tableSocket = tableSocket;
    this.gameSocket = gameSocket;
    this.user = user;
  }
}

module.exports = Player;
