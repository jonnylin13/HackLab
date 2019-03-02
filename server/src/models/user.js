const shortid = require('shortid');

class User {
  constructor(lid, nickname) {
    this.id = shortid.generate();
    this.lid = lid;
    this.nickname = nickname;
    this.runtime = 0;
    this.success = { bad: 0, good: 0 };
  }
}

module.exports = User;
