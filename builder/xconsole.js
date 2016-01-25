/*
 * xconsole.js
 *
 * This just formats console output with some adorable emojis
 * and colors, so get rid of it if it starts causing problems
 */

var colors = require('colors');

// save original console logging functions
var log = Function.prototype.bind.call(console.log, console);
var info = Function.prototype.bind.call(console.info, console);

// wrap console.log
console.log = function (msg) {
    var args = Array.prototype.slice.call(arguments, 1);
    //args.unshift('😼  ' + msg);
    args.unshift(msg);
    log.apply(console, args);
};

function out(msg, vars) {
    if (!vars) vars = [];
    vars.unshift(msg);
    info.apply(console, vars);
}

module.exports = {
    log: function (msg) {
        out(msg, Array.prototype.slice.call(arguments, 1));
    },
    activity: function (msg) {
        out('⌛  ' + (msg || '') + '...', Array.prototype.slice.call(arguments, 1));
    },
    success: function (msg) {
        out('😸  ' + (msg || ''), Array.prototype.slice.call(arguments, 1));
    },
    go: function (msg) {
        out('👉  ' + colors.bold.magenta(msg || ''), Array.prototype.slice.call(arguments, 1));
    },
    error: function (msg) {
        out('🙀  ' + colors.bold.red(msg || ''), Array.prototype.slice.call(arguments, 1));
    },
    warn: function (msg) {
        out('😿  ' + colors.yellow(msg || ''), Array.prototype.slice.call(arguments, 1));
    }
};
