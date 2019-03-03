const Lab = require('../models/lab');
const GarbageCollectionService = require('./gc-service');
const EvalService = require('./eval-service');

class LabService {
  constructor() {
    this.labs = {};
    this.gc = new GarbageCollectionService();
  }

  getLab(id) {
    return this.labs[id];
  }

  getGC() {
    return this.gc;
  }

  addLab(instructor, code) {
    let HackLab = EvalService.eval(code);
    let hacklab = new HackLab();
    let description = hacklab.description();
    let lab = new Lab(instructor, code, description);
    instructor.lid = lab.id;
    this.labs[lab.id] = lab;
    return this.labs[lab.id];
  }

  removeLab(id) {
    if (this.labs[id]) delete this.labs[id];
  }
}

module.exports = LabService;
