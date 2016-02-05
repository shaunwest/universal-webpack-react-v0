var webpack = require('webpack');
var baseConfig = require('./webpack-base-config.js');
var env = require('./env.js');
var devConfig = Object.assign({}, baseConfig);

// TODO: rename to watch config?

devConfig.debug = true;
devConfig.entry.unshift(
    'webpack-dev-server/client?' + env.watchServerUrl,
    'webpack/hot/dev-server'
);
devConfig.output.publicPath = env.watchServerUrl + '/dist/';
devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
devConfig.module.postLoaders.push(
    { test: /\.js$/, loaders: ['react-hot'], exclude: /node_modules/ }
);

module.exports = devConfig;
