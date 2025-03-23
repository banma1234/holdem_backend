class Game {
  constructor(tableCode, master) {
    this.gameTable = new GameTable(tableCode, master);
    this.poker = new Poker(); // Poker 라이브러리 초기화
    this.players = this.gameTable.getAllPlayers();
    this.activePlayers = []; // 생존한 플레이어 목록
    this.pot = 0; // 게임의 전체 칩(배팅 금액)
    this.round = 0; // 게임 라운드 추적
    this.smallBlind = 10; // 초기 스몰블라인드
    this.bigBlind = 20; // 초기 빅블라인드
    this.blindIncreaseInterval = 10 * 60 * 1000; // 10분마다 블라인드 증가 (밀리초 단위)
    this.lastBlindIncreaseTime = Date.now(); // 마지막 블라인드 증가 시간
    this.isRoundActive = true; // 라운드 진행 여부
  }

  // 한 라운드 진행
  playRound() {
    // 블라인드 증가 체크
    this.checkBlindIncrease();

    // 각 플레이어의 액션 처리 (베팅, 체크 등)
    this.activePlayers.forEach(player => {
      if (player.chips > 0) {
        // 플레이어가 칩이 남아있으면 차례가 돌아옴
        // 실제 게임 로직은 여기에 추가 (베팅, 체크 등)
      } else {
        // 돈이 없는 플레이어는 '바이인' 여부를 물어본다
        this.handleBuyIn(player);
      }
    });

    // 라운드 종료 후 승자 결정
    this.endRound();
  }

  // 블라인드가 10분마다 증가하는지 확인
  checkBlindIncrease() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - this.lastBlindIncreaseTime;

    if (timeElapsed >= this.blindIncreaseInterval) {
      // 블라인드 2배 증가
      this.smallBlind *= 2;
      this.bigBlind *= 2;
      this.lastBlindIncreaseTime = currentTime; // 마지막 블라인드 증가 시간 업데이트
      console.log(
        `블라인드 증가! 현재 스몰블라인드: ${this.smallBlind}, 빅블라인드: ${this.bigBlind}`,
      );
    }
  }

  // 바이인 처리: 돈을 잃은 플레이어에게 바이인 여부를 물어본다
  handleBuyIn(player) {
    // 클라이언트에 바이인 여부를 요청하는 메시지 전송
    console.log(`플레이어 ${player.nickname}가 바이인 여부를 결정해야 합니다.`);
    // 클라이언트에서 '바이인' 여부를 받는 로직 추가 필요
    // 예: 클라이언트에서 수락/거절 후 callback을 통해 결과 처리

    // 가정: 바이인 수락 후
    player.chips = 1000; // 예시로 1000칩을 지급

    // 바이인 거절 후
    // player.chips = 0; // 돈을 잃으면 0으로 설정
    // this.activePlayers = this.activePlayers.filter(p => p.id !== player.id); // 생존한 플레이어에서 제외
  }

  // 라운드 종료 후 승자 결정
  endRound() {
    // 생존한 플레이어가 1명 남으면 승리
    if (this.activePlayers.length === 1) {
      this.declareWinner(this.activePlayers[0]);
      return;
    }

    // 바이인 여부가 정해진 후에 라운드를 종료
    this.activePlayers.forEach(player => {
      if (player.chips <= 0) {
        // 바이인 거절 시 생존한 플레이어 목록에서 제외
        if (!player.hasAcceptedBuyIn) {
          this.activePlayers = this.activePlayers.filter(
            p => p.id !== player.id,
          );
        }
      }
    });

    // 라운드 종료 후 블라인드와 관련된 내용 결과 채팅에 broadcast
    this.broadcastRoundResult();

    // 새로운 라운드 시작
    this.round++; // 라운드 추적을 위해 round 값 증가
    this.startGame(); // 새 라운드 시작
  }

  // 라운드 결과를 채팅에 broadcast
  broadcastRoundResult() {
    const roundResult = {
      round: this.round,
      pot: this.pot,
      activePlayers: this.activePlayers.map(player => player.nickname),
      winner: this.activePlayers[0] ? this.activePlayers[0].nickname : "없음", // 승자 정보
    };

    // 게임의 채팅 시스템을 사용하여 결과를 broadcast
    console.log(`라운드 ${this.round} 결과:`, roundResult);
    // 실제 채팅 로직은 웹소켓을 통해 채팅에 결과를 전송하는 방식으로 구현해야 함
  }

  // 승자 선언
  declareWinner(player) {
    console.log(`${player.nickname} 승리!`);
    // 승자에게 포트 지급
    player.chips += this.pot;
  }
}
