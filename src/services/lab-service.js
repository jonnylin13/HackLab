const Lab = require('../models/lab');
const GarbageCollectionService = require('./gc-service');

class LabService {
  constructor() {
    this.labs = {};
    this.gc = new GarbageCollectionService();
  }

  getLabs() {
    return this.labs;
  }

  getGC() {
    return this.gc;
  }

  addLab(code) {
    let lab = new Lab(code);
    this.labs[lab.id] = lab;
    return this.labs[lab.id];
  }

  removeLab(id) {
    if (this.labs[id]) delete this.labs[id];
  }
}

module.exports = LabService;
