var colors = require('colors');
var log = require('./log.js');

module.exports = function() {
  var lines = [
    '___________________________',
    '\\__    ___/  _  \\__    ___/',
    '  |    | /  /_\\  \\|    |',
    '  |    |/    |    \\    |',
    '  |____|\\____|__  /____|',
    '                \\/          TEAM AWESOME TEAM R&D'
  ];

  lines.forEach(function(line) { log.out(line.bold.magenta) });
};
