var format = require('./format.js');
var args = require('./args.js')(process.argv);

var webpackHostname = process.env.WEBPACK_HOSTNAME || 'localhost';
var webpackPort = process.env.WEBPACK_PORT || 1335;
var assetUrlArg = 'http://' + webpackHostname + ':' + webpackPort;

var externalCssArg = args.linkcss;

var BABEL_PRESETS = ['es2015', 'react', 'stage-0'],
    APP_ROOT = '..';

function babelServer(externalCss, assetUrl) {
    assetUrl = (typeof assetUrl === 'undefined') ? assetUrlArg : assetUrl;

    console.log(format.activity('Starting server'));

    global.__SERVER__ = true;

    try {
        require('babel-polyfill');
        require('babel-core/register')({
            only: /src/,
            presets: BABEL_PRESETS
        });
        require(APP_ROOT + '/src/server')(externalCss || externalCssArg, assetUrl);
    }
    catch (error) {
        console.error(error.stack);
    }
}

module.exports = babelServer;
