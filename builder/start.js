/*
 * start.js
 * this is the master script for making and watching builds
 */

var colors = require('colors');
var format = require('./builder/format.js');
var args = require('./builder/args.js')(process.argv);
var webpackBuilder = require('./builder/index.js');

var banner = require('./banner.js');

// We're in server mode
global.__SERVER__ = true;

function startProd() {
    var config = require('./builder/webpack-prod-config.js');

    console.log('     PROD MODE     '.bgRed);
    console.log('');

    webpackBuilder.compile({
      config: config
    }, function onReady(err) {
        if (err) {
            console.log(format.warn(error.stack));
        }
        else {
            require('./builder/babel-server.js')(true, '');
        }
    });
}

function startDev() {
    var config = require('./builder/webpack-dev-config.js'),
        externalCss = args.linkcss,
        loud = args.loud;

    // Show a banner!
    banner();

    // Show some useful messaging
    console.log(format.success('Hello! Hit Ctrl+C to exit at any time'));

    if (externalCss) {
        console.log(format.link('External CSS linking is active'));
    }

    if (loud) {
        console.log('📢  Loud mode active');
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
            // "Piping" will watch for changes and relaunch the server
            require('piping')({
                main: './builder/start-babel-server.js',
                hook: true,
                includeModules: false
            });
        }
    });
}

if (process.env.NODE_ENV === 'production') {
    startProd();
}
else {
    startDev();
}
