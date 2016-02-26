/*
 * webpack-watch-config.js
 *
 * This config is a modification of the base config
 * intended for development. Mainly it sets up hot
 * module replacement.
 */

const webpack = require('webpack');
const deepcopy = require('deepcopy');

const baseConfig = require('./webpack-base-config.js');
const env = require('./env.js');

const watchConfig = deepcopy(baseConfig);

watchConfig.debug = true;
watchConfig.entry.unshift(
    'webpack-dev-server/client?' + env.watchServerUrl,
    'webpack/hot/dev-server'
);
watchConfig.output.publicPath = env.watchServerUrl + '/dist/';
watchConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
watchConfig.module.postLoaders.push(
    { test: /\.js$/, loaders: ['react-hot'], exclude: /node_modules/ }
);

module.exports = watchConfig;
