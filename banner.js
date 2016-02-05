var colors = require('colors');

module.exports = function() {
  var lines = [
      ' ___________________________',
      ' \\__    ___/  _  \\__    ___/',
      '   |    | /  /_\\  \\|    |',
      '   |    |/    |    \\    |',
      '   |____|\\____|__  /____|',
      '                 \\/          TEAM AWESOME TEAM R&D',
      '',
      ''
  ];

  lines.forEach(function(line) { console.log(line.bold.magenta) });
};
