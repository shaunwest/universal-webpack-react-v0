var format = require('./format.js');
var args = require('./args.js')(process.argv);

var externalCss = args.linkcss;

var BABEL_PRESETS = ['es2015', 'react', 'stage-0'],
    APP_ROOT = '..';

function babelServer(externalCss, assetUrl) {
    console.log(format.activity('Starting dev server'));

    global.__SERVER__ = true;

    try {
        require('babel-polyfill');
        require('babel-core/register')({
            only: /src/,
            presets: BABEL_PRESETS
        });
        require(APP_ROOT + '/src/server')(externalCss, assetUrl);
    }
    catch (error) {
        console.error(error.stack);
    }
}

module.exports = babelServer;
