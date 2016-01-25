var colors = require('colors');
var xconsole = require('./xconsole.js');

module.exports = function() {
  var lines = [
      '___________________________',
      '\\__    ___/  _  \\__    ___/',
      '  |    | /  /_\\  \\|    |',
      '  |    |/    |    \\    |',
      '  |____|\\____|__  /____|',
      '                \\/          TEAM AWESOME TEAM R&D'
  ];

  lines.forEach(function(line) { xconsole.log(line.bold.magenta) });
};
