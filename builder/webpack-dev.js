var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

var config = require('./webpack-base-config.js');
var devConfig = require('./webpack-dev-config.js');
var format = require('./format.js');
var env = require('./env.js');

function runWebpackCompile(cb) {
    console.log(format.activity('Compiling'));
    // TODO: does this config need to be base config or can it be devConfig?
    webpack(devConfig)
        .run(function(err, stats) {
            if (cb) {
                cb(err, stats);
            }
            else {
                console.log('Webpack compile complete');
            }
        });
}

function runWebpackServer(options, cb) {
    var server, serverCompiler,
      noInfo = !options.loud;
    
    // If not linking external css, use the webpack import method (which will hotload css changes)
    if (!options.externalCss) {
        devConfig.module.loaders[0] = { test: /\.scss$/, loaders: ['style', 'css', 'sass'] };
    }

    serverCompiler = webpack(devConfig);

    server = new WebpackDevServer(serverCompiler, {
        hot: true,
        contentBase: '../static',
        inline: true,
        quiet: false, // true = don't output anything to console, false = output it
        noInfo: noInfo, // hide output except for errors (?)
        filename: 'client.js',
        watchOptions: {
            aggregateTimeout: 200,
            poll: 500
        },
        publicPath: env.watchServerUrl + '/dist/',
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: { colors: true },
        host: env.watchServerHostname
    });

    server.listen(env.watchServerPort, env.watchServerHostname, function(err) {
        if (cb) {
            cb(err, env.watchServerHostname, env.watchServerPort);
        }
        else {
            console.log('Webpack Server listening @ http://' + env.watchServerUrl);
        }
    });
}

function start(options, onCompiled, onListening) {
    function startWebpackServer() {
        try {
            runWebpackServer(options, onListening);
        }
        catch(error) {
            console.log(format.warn('We\'re not gonna be able to watch for changes because of an error with webpack dev server'));
            console.log(format.warn(error.stack));
        }
    }

    try {
        runWebpackCompile(function (err) {
            if (onCompiled) onCompiled();
            startWebpackServer();
        });
    }
    catch(error) {
        console.log(format.error('Looks like something\'s wrong with your webpack configuration: ' + error.stack));
    }
}

module.exports = start;
