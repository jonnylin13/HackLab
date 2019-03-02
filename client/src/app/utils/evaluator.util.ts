function _eval() {
  return new Promise((resolve, reject) => {
    let bad = 0;
    let good = 0;

    setTimeout(() => {
      for (var err in this.assertions) {
        let condition = this.assertions[err];
        console.assert(condition, err);
        if (!condition) bad++;
        else good++;
      }
      for (var condition of this._hiddenAssertions) {
        console.assert(condition);
        if (!condition) bad++;
        else good++;
      }
      resolve({ bad: bad, good: good });
    }, 0);
  });
}

const _js = `class HackLab {
  // 1. Replace the build function with your 
  //    lab description and its assertions.
  build() {
    let data = {
      description: 'Given a list of n integers, return the max value.',
      constraints: '-5 < x < 5 for number x in our list.',
      input: 'Integer array of size n, n never exceeds 10.',
      output: 'Max integer value of the given array.',
      assertions: {
        '0 expected from [-1, 0].': this.solution([-1,0]) === 0,
        'This is a custom msg.': this.solution([1,2,3,4]) === 4,
      },
      // These assertions are not exposed to the lab student.
      _hiddenAssertions: [
        this.solution([-4,4,0,2,3,4,1,2,-4,1]) === 4,
        this.solution([2]) === 2
    ]};
    return data;
  }
  // 2. Set the function input variables and return an appropriate value
  solution(arr) {
    return 100;
  }
  // 3. Click "Run Local" if you'd like to test your assertions.
  //    Results are printed in the browser console (unsafe execution).

  // 4. Click "Post Lab" when you are ready.
  //    If you implement a solution, be sure to clear it
  //    before you post your lab!
}

new HackLab();`;

const _schema = {
  description: 'string',
  constraints: 'string',
  assertions: 'object',
  _hiddenAssertions: 'object',
  input: 'string',
  output: 'string'
};

export class Evaluator {
  constructor() {}
  js: string = _js;

  verify(data: object) {
    if (Object.keys(data).length !== Object.keys(_schema).length) {
      console.error('Mismatching number of build properties.');
      return false;
    }
    for (let field in data) {
      if (typeof data[field] !== _schema[field]) {
        console.error('One of your build properties is the wrong data type.');
        return false;
      }
      if (field === 'assertions') {
        for (let key in data[field]) {
          if (typeof key !== 'string') {
            console.error('Check your assertion keys!');
            return false;
          }
          if (typeof data[field][key] !== 'boolean') {
            console.error('Check your assertion values!');
            return false;
          }
        }
      } else if (field === '_hiddenAssertions') {
        for (let obj of data[field]) {
          if (typeof obj !== 'boolean') {
            console.error('Check your hidden assertions!');
            return false;
          }
        }
      }
    }
    return true;
  }

  evaluate(code: string) {
    console.clear();
    let timestamp = new Date();
    setTimeout(() => {
      // Todo: timeout?
      let hacklab = eval(code);
      let hlProto = Object.getPrototypeOf(hacklab);
      // Todo: validate solution()?
      let data = hacklab.build();

      if (!this.verify(data)) return;

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
        })
        .catch(error => {
          throw new Error(error);
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
