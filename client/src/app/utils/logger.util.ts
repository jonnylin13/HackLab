// Todo: global console proxy

function proxy(context, method, header) {
  return function() {
    method.apply(
      context,
      [header].concat(Array.prototype.slice.apply(arguments))
    );
  };
}

console.log = proxy(console, console.log, '<Log> ');
console.warn = proxy(console, console.warn, '<Warning> ');
console.assert = proxy(console, console.assert, '<Assertion> ');
