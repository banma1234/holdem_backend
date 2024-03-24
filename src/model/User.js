class User {
  constructor(params) {
    this.email = params.email;
    this.password = params.password;
    this.nickname = params.nickname;
  }
}

module.exports = User;
