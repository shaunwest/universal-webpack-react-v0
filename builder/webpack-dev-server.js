var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack-client');

var hostname = process.env.HOSTNAME || 'localhost';

var clientCompiler = webpack(config);
clientCompiler.run(function(err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log('Compiled!');
    }
});

config.debug = true;
config.entry.unshift(
    'webpack-dev-server/client?http://' + hostname + ':8080',
    'webpack/hot/only-dev-server'
);

config.output.publicPath = 'http://' + hostname + ':8080/dist/';

//config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
//config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
    new webpack.DefinePlugin({ __SERVER__: false }),
    new webpack.HotModuleReplacementPlugin()
];

config.module.postLoaders = [
    { test: /\.js$/, loaders: ['react-hot'], exclude: /node_modules/ }
];

var serverCompiler = webpack(config);

var server = new WebpackDevServer(serverCompiler, {
    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a 'webpackHotUpdate' message is send to the content
    // Use 'webpack/hot/dev-server' as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    //historyApiFallback: false,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use '*' to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    //proxy: {
    //    '*': 'http://localhost:1336'
    //},
     
    contentBase: '../static',
    //contentBase: 'http://' + hostname + ':1336/', // iframe (non-inline) mode
    inline: true,

    // webpack-dev-middleware options
    quiet: true, // output stuff to console (yes or no?)
    noInfo: false, // suppress boring stuff (yes or no?)
    filename: 'client.js',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath: 'http://' + hostname + ':8080/dist/',
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: { colors: true },
    host: hostname
});

server.listen(8080, 'localhost', function(err) {
    console.log('Webpack Server listening @ http://' + hostname + ':8080');
});

module.exports = server;
// server.close();
