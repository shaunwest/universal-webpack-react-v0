var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./webpack-client');
var format = require('./format');

var hostname = process.env.WEBPACK_HOSTNAME || 'localhost';
var port = process.env.WEBPACK_PORT || 8080;
var serverUrl = 'http://' + hostname + ':' + port;

function runWebpackCompile(cb) {
    console.log(format.activity('Compiling'));
    webpack(config)
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
    var server, serverCompiler;

    config.debug = true;
    config.entry.unshift(
        'webpack-dev-server/client?' + serverUrl,
        'webpack/hot/dev-server'
    );

    config.output.publicPath = serverUrl + '/dist/';

    // TODO: figure out what exactly this does
    //config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
    //config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

    config.plugins = [
        new webpack.DefinePlugin({ __SERVER__: false }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css')
    ];

    // If not linking external css, use the webpack import method (which will hotload css changes)
    if (!options.externalCss) {
        config.module.loaders[0] = { test: /\.scss$/, loaders: ['style', 'css', 'sass'] };
    }

    config.module.postLoaders = [
        { test: /\.js$/, loaders: ['react-hot'], exclude: /node_modules/ }
    ];

    serverCompiler = webpack(config);

    server = new WebpackDevServer(serverCompiler, {
        hot: true,
        contentBase: '../static',
        inline: true,
        // webpack-dev-middleware options
        // FIXME: errors don't show on CLI in quite mode
        quiet: true, // false = output stuff to console
        noInfo: false, // false = output *boring* stuff to console 
        filename: 'client.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500
        },
        publicPath: serverUrl + '/dist/',
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: { colors: true },
        host: hostname
    });

    server.listen(8080, 'localhost', function(err) {
        if (cb) {
            cb(err);
        }
        else {
            console.log('Webpack Server listening @ http://' + serverUrl);
        }
    });
}

function start(options, onCompiled, onListening) {
    function startWebpackServer() {
        try {
            runWebpackServer(options, onListening);
        }
        catch(error) {
            console.log(format.warn('We\'re not gonna be able to watch for changes because of an error with webpack-dev-server.js'));
            console.log(format.warn(error.stack));
        }
    }

    try {
        runWebpackCompile(function () {
            if (onCompiled) onCompiled();
            startWebpackServer();
        });
    }
    catch(error) {
        console.log(format.error('Looks like something\'s wrong with your webpack-client.js configuration: ' + error.stack));
    }
}

module.exports = start;
