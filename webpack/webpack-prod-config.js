import webpack from 'webpack';
import deepcopy from 'deepcopy';

import baseConfig from './webpack-base-config.js';

const prodConfig = deepcopy(baseConfig);

prodConfig.devTool = false;
// TODO: what about css minification?
prodConfig.plugins.push(new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin());

delete prodConfig.output.sourceMapFilename;

module.exports = prodConfig;
