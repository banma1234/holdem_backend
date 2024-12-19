class GameTable {
  constructor(tableCode) {
      this.tableCode = tableCode;
      this.players = [];
      this.gameStarted = false;
      this.master = {
        id: undefined,
        nickname: undefined
      };
  }

  addPlayer(player) {
      if (this.players.length >= 8) {
          throw new Error('방이 가득 찼습니다.');
      }

      this.players.push(player);
      if (!this.master) {
          this.master.id = player.id;
          this.master.nickname = player.nickname;
      }
  }

  removePlayer(playerId) {
      this.players = this.players.filter(p => p.id !== playerId);

      if (this.master === playerId && this.players.length > 0) {
          this.master = this.players[0].id; // 방장이 나갔을 경우 첫 번째 유저를 방장으로 설정
      }
  }

  togglePlayerReady(playerId) {
      const player = this.players.find(p => p.id === playerId);

      if (player) {
          player.toggleReady();
      }
  }

  isAllPlayersReady() {
      return this.players.length > 0 && this.players.every(p => p.ready);
  }
}

module.exports = GameTable;
