export class GarbageCollectionService {
  constructor(labService) {
    this.labService = labService;
  }

  clean() {
    console.warn('GARBAGE COLLECTION NEEDS IMPLENTING!!!');
  }
}

module.exports = GarbageCollectionService;
