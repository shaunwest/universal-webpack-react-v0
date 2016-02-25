var webpack = require('webpack');
var baseConfig = require('./webpack-base-config.js');
var env = require('./env.js');
var watchConfig = Object.assign({}, baseConfig);

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
