var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var fs = require('fs');
var env = require('./env.js');

function runWebpackCompile(options, cb) {
    console.activity('Compiling');
    webpack(options.config)
        .run(function(err, stats) {
            if (cb) {
                cb(err, stats);
            }
            console.success('Compile finished');
        });
}

function runWebpackServer(options, cb) {
    var server, serverCompiler,
      noInfo = !options.loud;
    
    // If not linking external css, use the webpack import method
    // (which will hotload css changes)
    if (!options.externalCss) {
        options.config.module.loaders[0] = {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        };
    }

    console.activity('Compiling');

    serverCompiler = webpack(options.config);

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
        console.success('Compile finished');

        if (cb) {
            cb(err, env.watchServerHostname, env.watchServerPort);
        } else {
            console.log('Webpack Server listening @ http://' + env.watchServerUrl);
        }
    });
}

module.exports = {
  compile: runWebpackCompile,
  watch: runWebpackServer  
};
