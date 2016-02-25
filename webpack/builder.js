import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import colors from 'colors';

import env from './env';
import xconsole from './console.js';
import prodConfig from './webpack-prod-config.js';
import watchConfig from './webpack-watch-config.js';

// Enable some special console formatting
xconsole();

// This is determined by the NODE_ENV CLI variable
// e.g. NODE_ENV="production" node ./my-script"
const isProd = () => process.env.NODE_ENV === 'production';

// Register options for the prod build
export function prod(cb) {
    if (isProd()) {
        startProd(cb());
    }
}

// Register options for the dev build
export function dev(cb) {
    if (!isProd()) {
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
    const loud = options.loud;

    // Show some useful messaging
    console.success('Hello! Hit Ctrl+C to exit at any time');

    if (externalCss) {
        console.link('External CSS linking is active');
    }

    if (loud) {
        console.verbose('Loud mode active');
    }

    // Start the webpack dev server
    watch({
        config: watchConfig,
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
                main: './webpack/babel-server-dev.js',
                hook: true,
                includeModules: false
            });
        }
    });
}
export function compile(options, cb) {
    console.activity('Compiling');

    webpack(options.config)
        .run(function(err, stats) {
            if (cb) {
                cb(err, stats);
            }
            console.success('Compile finished');
        });
}

export function watch(options, cb) {
    const noInfo = !options.loud;
    
    // If not linking external css, use the webpack import method
    // (which will hotload css changes)
    if (!options.externalCss) {
        options.config.module.loaders[0] = {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        };
    }

    console.activity('Compiling');

    const serverCompiler = webpack(options.config);
    const server = new WebpackDevServer(serverCompiler, {
        hot: true,
        contentBase: '../static',
        inline: true,
        quiet: false, // true = don't output anything to console, false = output it
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
        console.success('Compile finished. One moment...');

        if (cb) {
            cb(err, env.watchServerHostname, env.watchServerPort);
        } else {
            console.log('Webpack Server listening @ http://' + env.watchServerUrl);
        }
    });
}
