const hri = require('human-readable-ids').hri;

class Lab {
  constructor(instructor, code, description, parsedCode) {
    this.id = hri.random();
    this.code = code;
    this.parsedCode = parsedCode;
    this.description = description;
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

  removeStudent(uid) {
    if (uid in this.students) delete this.students[uid];
  }

  contains(user) {
    return user.id in this.students;
  }

  getStudent(uid) {
    return this.students[uid];
  }
}

module.exports = Lab;
