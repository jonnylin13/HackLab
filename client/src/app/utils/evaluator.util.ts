function _eval() {
  return new Promise((resolve, reject) => {
    let bad = 0;
    let good = 0;

    setTimeout(() => {
      for (var err in this) {
        let condition = this[err];
        console.assert(condition, err);
        if (!condition) bad++;
        else good++;
      }
      resolve({ bad: bad, good: good });
    }, 0);
  });
}

const _js = `class HackLab {
  
  description() {
    let description = {
      description: 'Given a list of n integers, return the max value.',
      constraints: '-5 < x < 5 for number x in our list.',
      input: 'Integer array of size n, n never exceeds 10.',
      output: 'Max integer value of the given array.'
    };
    return description;
  }

  build() {
    let assertions = {
      '0 expected from [-1, 0].': this.solution([-1,0]) === 0,
      'This is a custom msg.': this.solution([1,2,3,4]) === 4,
    };
    return assertions;
  }

  solution(arr) {
    return 100;
  }
}

module.exports = HackLab;`;

export class Evaluator {
  constructor() {}
  js: string = _js;

  evaluate(code: string) {
    console.clear();
    let timestamp = new Date();
    return new Promise(res => {
      setTimeout(() => {
        // Todo: timeout?
        let HackLab = eval(code);
        let hacklab = new HackLab();
        let hlProto = Object.getPrototypeOf(hacklab);
        // Todo: validate solution()?
        let data = hacklab.build();
        let getResult = _eval.bind(data);
        getResult()
          .then(result => {
            let runtime =
              new Date().getMilliseconds() - timestamp.getMilliseconds();
            console.log(
              result.good +
                ' out of ' +
                (result.bad + result.good) +
                ' ran successfully.'
            );
            console.log('Runtime: ' + runtime + ' ms.');
            if (result.bad == 0) res(true);
            else res(false);
          })
          .catch(error => {
            throw new Error(error);
          });
      });
    });
  }

  getJS() {
    return this.js;
  }

  format(code: string) {
    return code;
  }
}
