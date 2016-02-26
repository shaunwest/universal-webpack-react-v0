/*
 * webpack-base-config.js
 * 
 * This is a base level webpack configuration. More specific configurations
 * can build on top of it.
 * 
 * See also webpack-prod-config.js and webpack-watch-config.js
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const env = require('./env.js');

module.exports = {
    target: 'web',
    cache: true,
    context: env.appRoot,
    devtool: 'source-map',
    entry: ['./client/client'],
    output: {
        path: path.join(env.appRoot, 'static/dist'),
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
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
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
