/*
 * index.js
 *
 * This is the main entry point into the webpack build system
 */

var BABEL_PRESETS = ['es2015', 'react', 'stage-0'];

// Enable ES2015 (on build modules used require() below)
require('babel-polyfill');
require('babel-core/register')({
    presets: BABEL_PRESETS
});

// Colorful console output
var colors = require('colors');

// Builder.js is a custom wrapper for webpack
var webpackBuilder = require('./builder.js');

// Console logging helper functions
require('./console.js')();

// This is determined by the NODE_ENV CLI variable
// e.g. NODE_ENV="production" node ./my-script"
function isProd() {
    return process.env.NODE_ENV === 'production';
}

// Register options for the prod build
function prod(cb) {
    if (isProd()) {
        startProd(cb());
    }
}

// Register options for the dev build
function dev(cb) {
    if (!isProd()) {
        startDev(cb());
    }
}

// Run a prod build
function startProd(options) {
    var config = require('./webpack-prod-config.js'),
        EXTERNAL_CSS = true;

    webpackBuilder.compile({
        config: config
    }, function onReady(err) {
        if (err) {
            console.warn(error.stack);
        }
        else {
            require('./babel-server.js')(EXTERNAL_CSS);
        }
    });
}

// Run a dev build (which automatically watches)
function startDev(options) {
    var config = require('./webpack-watch-config.js'),
        externalCss = options.externalCss,
        loud = options.loud;

    // Show some useful messaging
    console.success('Hello! Hit Ctrl+C to exit at any time');

    if (externalCss) {
        console.link('External CSS linking is active');
    }

    if (loud) {
        console.verbose('Loud mode active');
    }

    // Start the webpack dev server
    webpackBuilder.watch({
        config: config,
        externalCss: externalCss,
        loud: loud
    },
    function onReady(err) {
        if (err) {
            console.warn(error.stack);
        }
        else {
            // Spawn a new babel server process
            // "piping" will watch for changes and relaunch the server
            require('piping')({
                main: './webpack/start-babel-server.js',
                hook: true,
                includeModules: false
            });
        }
    });
}

module.exports = {
    prod: prod,
    dev: dev
};
