var colors = require('colors');

// save original console logging functions
var log = Function.prototype.bind.call(console.log, console);
var info = Function.prototype.bind.call(console.info, console);

// wrap console.log
console.log = function (msg) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.unshift('😼  ' + msg);
  log.apply(console, args);
};

function out(msg, vars) {
  if (!vars) vars = [];
  vars.unshift(msg);
  info.apply(console, vars);
}

module.exports = {
  out: function (msg) {
    out(msg, Array.prototype.slice.call(arguments, 1));
  },
  activity: function (msg) {
    out('⌛  ' + (msg || '') + '...', Array.prototype.slice.call(arguments, 1));
  },
  success: function (msg) {
    out('😸  ' + (msg || ''), Array.prototype.slice.call(arguments, 1));
  },
  go: function (msg) {
    out('👉  ' + (msg || '').bold.magenta, Array.prototype.slice.call(arguments, 1));
  }
};
