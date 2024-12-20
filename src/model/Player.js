class Player {
  constructor(params) {
    this.id = params.id;
    this.nickname = params.nickname;
    this.dollar = params.dollar;
    this.isReady = false;
  }
}

module.exports = Player;

// interface PlayerParams {
//   id: string;
//   nickname: string;
//   dollar?: number;
// }

// class Player {
//   id: string;
//   nickname: string;
//   dollar?: number;
//   isReady: boolean;

//   constructor(params: PlayerParams) {
//     this.id = params.id;
//     this.nickname = params.nickname;
//     this.dollar = params.dollar;
//     this.isReady = false;
//   }
// }

// module.exports = Player;
