/*
 * start.js
 * this is the master script for making and watching builds
 */

var format = require('./format.js');
var banner = require('./banner.js');
var args = require('./args.js')(process.argv);

var devServer;
var webpackProd;

var APP_ROOT = '..';

var externalCss = args.linkcss;

// We're in server mode
global.__SERVER__ = true;

// If in prod mode, just start the babel server
if (process.env.NODE_ENV === 'production') {
    console.log('     PROD MODE     '.bgRed);
    console.log('');

    webpackProd = require('./webpack-prod.js');
    webpackProd(function () {
        require('./babel-server.js')(true, '');
    });
}
else {
    // Show a banner!
    banner();

    console.log(format.success('Hello! Hit Ctrl+C to exit at any time'));

    if (externalCss) {
        console.log(format.link('External CSS linking is active.'));
    }

    // Start the webpack dev server
    devServer = require(APP_ROOT + '/builder/webpack-dev.js');

    if (devServer) {
        devServer({
            externalCss: externalCss
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
        function onWatching() {
            console.log(format.success('Watching for changes'));
        });
    }
}
