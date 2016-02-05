/*
 * index.js
 */

var colors = require('colors');
var webpackBuilder = require('./builder.js');
var format = require('./format.js');

// We're in server mode
global.__SERVER__ = true;

function startProd(options) {
    var config = require('./webpack-prod-config.js'),
        EXTERNAL_CSS = true,
        ASSET_URL = '';

    webpackBuilder.compile({
        config: config
    }, function onReady(err) {
        if (err) {
            console.log(format.warn(error.stack));
        }
        else {
            require('./babel-server.js')(EXTERNAL_CSS, ASSET_URL);
        }
    });
}

function startDev(options) {
    var config = require('./webpack-dev-config.js'),
        externalCss = options.externalCss,
        loud = options.loud;

    // Show some useful messaging
    console.log(format.success('Hello! Hit Ctrl+C to exit at any time'));

    if (externalCss) {
        console.log(format.link('External CSS linking is active'));
    }

    if (loud) {
        console.log(format.verbose('Loud mode active'));
    }

    // Start the webpack dev server
    webpackBuilder.watch({
        config: config,
        externalCss: externalCss,
        loud: loud
    },
    function onReady(err) {
        if (err) {
            console.log(format.warn(error.stack));
        }
        else {
            // Spawn a new babel server process
            // "piping" will watch for changes and relaunch the server
            require('piping')({
                main: './builder/start-babel-server.js',
                hook: true,
                includeModules: false
            });
        }
    });
}

module.exports = {
  prod: startProd,
  dev: startDev
};
