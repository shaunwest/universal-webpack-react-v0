import webpack from 'webpack';
import deepcopy from 'deepcopy';

import baseConfig from './webpack-base-config.js';
import env from './env.js';

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
