/*
 * start.js
 * this is the master script for making and watching builds
 */

var colors = require('colors');
var format = require('./format.js');
var banner = require('./banner.js');
var args = require('./args.js')(process.argv);

var APP_ROOT = '..';

// We're in server mode
global.__SERVER__ = true;

function startProd() {
    var webpackProd;

    console.log('     PROD MODE     '.bgRed);
    console.log('');

    webpackProd = require('./webpack-prod.js');
    webpackProd(function () {
        require('./babel-server.js')(true, '');
    });
}

function startDev() {
    var devServer,
      externalCss = args.linkcss,
      loud = args.loud;

    // Show a banner!
    banner();

    console.log(format.success('Hello! Hit Ctrl+C to exit at any time'));

    if (externalCss) {
        console.log(format.link('External CSS linking is active'));
    }

    if (loud) {
        console.log('📢  Loud mode active');
    }

    // Start the webpack dev server
    devServer = require(APP_ROOT + '/builder/webpack-dev.js');

    if (devServer) {
        devServer({
            externalCss: externalCss,
            loud: loud
        },
        function onCompile() {
            console.log(format.success('Compile finished'));

            // Spawn a new babel server process
            // Piping will watch for changes and relaunch the server
            require('piping')({
                main: './builder/start-babel-server.js',
                hook: true,
                includeModules: false
            });
        },
        function onWatching(err) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(format.success('Watching for changes'));
            }
        });
    }
}

if (process.env.NODE_ENV === 'production') {
    startProd();
}
else {
    startDev();
}
