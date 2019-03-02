const shortid = require('shortid');

class Lab {
  constructor(code, instructor) {
    this.id = shortid.generate();
    this.code = code;
    this.instructor = instructor;
    this.students = {};
    this.lastUsed = new Date();
  }

  getId() {
    return this.id;
  }

  getCode() {
    return this.code;
  }

  addStudent(user) {
    if (this.contains(user)) delete this.students[user.id];
    this.students[user.id] = user;
  }

  contains(user) {
    return user.id in this.students;
  }
}

module.exports = Lab;
