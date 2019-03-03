const vm = require('vm');

class EvalService {
  static eval(code) {
    let sandbox = vm.createContext({
      module: {
        exports: ''
      }
    });
    return vm.runInContext(code, sandbox);
  }
}

module.exports = EvalService;
