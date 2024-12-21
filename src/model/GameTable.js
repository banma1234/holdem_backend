class GameTable {
  constructor(tableCode, master) {
    this.tableCode = tableCode;
    this.players = new Array(8);
    this.gameStarted = false;
    this.master = {
      id: master.id,
      nickname: master.nickname,
    };

    this.players.push(master);
  }

  addPlayer(player) {
    if (this.players.length >= 8) {
      throw new Error("방이 가득 찼습니다.");
    }

    this.players.push(player);
  }

  removePlayerById(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);

    if (this.master === playerId && this.players.length > 0) {
      this.master = this.players[0].id; // 방장이 나갔을 경우 첫 번째 유저를 방장으로 설정
    }
  }

  getPlayerById(playerId) {
    const targetPlayer = this.players.find(p => p.id === playerId);
    return targetPlayer ? targetPlayer : undefined;
  }

  getAllPlayers() {
    return this.players;
  }

  togglePlayerReady(playerId) {
    const targetPlayer = this.getPlayerById(playerId);

    if (targetPlayer) {
      targetPlayer.isReady = true;
    }
  }

  isAllPlayersReady() {
    return this.players.length > 0 && this.players.every(p => p.ready);
  }

  isEmpty() {
    return this.players.length === 0 ? true : false;
  }

  isPlayerExist(playerId) {
    if (!this.getPlayerById(playerId)) {
      return false;
    }

    return true;
  }
}

module.exports = GameTable;
