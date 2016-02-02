var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var APP_ROOT = path.join(__dirname,  '/../');

module.exports = {
    target: 'web',
    cache: true,
    context: APP_ROOT,
    devtool: 'source-map',
    entry: ['./src/client'],
    output: {
        path: path.join(APP_ROOT, 'static/dist'),
        filename: 'client.js',
        publicPath: 'dist/',
        sourceMapFilename: '[file].map'
    },
    plugins: [
        new webpack.DefinePlugin({ __SERVER__: false }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
            { test: /\.json$/, loaders: ['json'] },
            { test: /\.js$/, loaders: ['babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0'], exclude: /node_modules/ }
        ],
        postLoaders: [],
        noParse: /\.min\.js/
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
};
