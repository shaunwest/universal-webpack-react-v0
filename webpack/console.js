var fs = require('fs');

function getRemapMethod(method) {
  var consoleMethod = (method in console) ? method : 'log';
  return Function.prototype.bind.call(console[consoleMethod], console);
}

function remap(funcName, func, remapFunc) {
  console[funcName] = function() {
    arguments[0] = func(arguments[0]);
    remapFunc.apply(console, arguments);
  };
}

function getFormatting() {
  try {
      fs.lstatSync(__dirname + '/../format.js');
  }
  catch (e) {
      return require('./format.js');
  }

  return require('../format.js');
}

function attachConsoleMethods() {
  var obj = getFormatting();

  Object.keys(obj).forEach(function (funcName) {
    var func = obj[funcName];

    if (typeof func !== 'function') {
      return;
    }
    
    func = func.bind(obj); 
    remap(funcName, func, getRemapMethod(funcName));
  });
}

module.exports = attachConsoleMethods;
