var args = require('./args.js')(process.argv);
var externalCss = args.linkcss;

var BABEL_PRESETS = ['es2015', 'react', 'stage-0'];

function babelServer(devMode) {
    console.activity('Starting server');

    global.__SERVER__ = true;

    try {
        require('babel-polyfill');
        require('babel-core/register')({
            only: /src/,
            presets: BABEL_PRESETS
        });
        require('../src/server')(devMode, externalCss);
    }
    catch (error) {
        console.error(error.stack);
    }
}

module.exports = babelServer;
