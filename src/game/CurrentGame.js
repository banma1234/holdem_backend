class CurrentGame {
  constructor(gameSocket) {
    this.gameSocket = gameSocket;
    this.players = null;
  }

  joinPlayerToGame(players) {
    this.players = players;
    this.startGame();
  }

  startGame() {
    console.log("게임 시작\n==============================");
  }
}

module.exports = CurrentGame;
