class Player {
    constructor(params) {
        this.id = params.id;
        this.nickname = params.nickname;
        this.dollar = params.dollar;
        this.ready = false;
    }
}

module.exports = Player;