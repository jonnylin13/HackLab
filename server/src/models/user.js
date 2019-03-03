const shortid = require('shortid');

class User {
  constructor(lid, nickname) {
    this.id = shortid.generate();
    this.lid = lid;
    this.nickname = nickname;
    this.runtime = 0.0;
    this.completed = false;
  }

  setCompleted(completed) {
    this.completed = completed;
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }
}

module.exports = User;
