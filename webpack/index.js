/*
 * index.js
 *
 * This compiles webpack configurations, starts
 * the webpack dev server and starts the main
 * (node) web server.
 */

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const util = require('./util');
const env = require('./env');
const prodConfig = require('./webpack-prod-config');
const watchConfig = require('./webpack-watch-config');

// Register options for the prod build
function prod(cb) {
    if (util.isProd()) {
        startProd(cb());
    }
}

// Register options for the dev build
function dev(cb) {
    if (!util.isProd()) {
        startDev(cb());
    }
}

// Run a prod build
function startProd(options) {
    compile({
        config: prodConfig
    }, function onReady(err) {
        if (err) {
            console.warn(error.stack);
        }
        else {
            require('./babel-server.js')();
        }
    });
}

// Run a dev build (which automatically watches)
function startDev(options) {
    const externalCss = options.externalCss;
    const verbose = options.verbose;

    // Show some useful messaging
    console.info('😸  Hello! Hit Ctrl+C to exit at any time');

    if (externalCss) {
        console.info('-> External CSS linking is active');
    }

    if (verbose) {
        console.info('-> Verbose mode active');
    }

    // Start the webpack dev server
    watch({
        config: watchConfig,
        externalCss,
        verbose
    },
    function onReady(err) {
        if (err) {
            console.warn(error.stack);
        }
        else {
            // Spawn a new babel server process
            // "piping" will watch for changes and relaunch the server
            require('piping')({
                main: './webpack/babel-server-dev.js',
                hook: true,
                includeModules: false
            });
        }
    });
}

// Webpack compile
function compile(options, cb) {
    console.info('-> Compiling...');

    webpack(options.config)
        .run(function(err, stats) {
            if (cb) {
                cb(err, stats);
            }
            console.info('-> Compile finished');
        });
}

// Set up a webpack dev server, which is used
// for watching and hot reloading
function watch(options, cb) {
    const noInfo = !options.verbose;
    
    // If not linking external css, use the webpack import method
    // (which will hotload css changes)
    if (!options.externalCss) {
        options.config.module.loaders[0] = {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        };
    }

    console.info('-> Compiling...');

    const serverCompiler = webpack(options.config);
    const server = new WebpackDevServer(serverCompiler, {
        hot: true,      // do hot module replacement
        contentBase: '../static',
        inline: true,
        quiet: false,   // true = don't output anything to console, false = output it
        noInfo: noInfo, // true = hide output except for errors (?)
        filename: 'client.js',
        watchOptions: {
            aggregateTimeout: 200,
            poll: 100
        },
        publicPath: env.watchServerUrl + '/dist/',
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: { colors: true },
        host: env.watchServerHostname
    });

    server.listen(env.watchServerPort, env.watchServerHostname, err => {
        console.info('-> Compile finished. One moment...');

        if (cb) {
            cb(err, env.watchServerHostname, env.watchServerPort);
        } else {
            console.info('-> Webpack Server listening @ http://' + env.watchServerUrl);
        }
    });
}

module.exports = {
  prod,
  dev
};
