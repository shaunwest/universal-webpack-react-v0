var webpack = require("webpack");
var path = require('path');

var APP_ROOT = path.join(__dirname,  '/../');

var compiler = webpack({
    target: 'web',
    cache: false,
    context: APP_ROOT,
    devtool: false,
    entry: './src/client',
    output: {
        path: path.join(APP_ROOT, 'static/dist'),
        filename: 'client.js',
        chunkFilename: '[name].[id].js'
        //publicPath: 'dist/'
    },
    plugins: [
        new webpack.DefinePlugin({ __SERVER__: false })
        //new webpack.DefinePlugin({ 'process.env': {NODE_ENV: '\'prod\''} }),
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.UglifyJsPlugin()
    ],
    module:  {
        loaders: [
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.json$/, loaders: ['json'] },
            { test: /\.js$/, loaders: ['babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0'], exclude: /node_modules/ }
        ],
        postLoaders: [],
        noParse: /\.min\.js/
    }
});

compiler.run(function(err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log('Compiled!');
    }
});

/*
compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, function(err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log('Compiled!');
    }
});
*/
