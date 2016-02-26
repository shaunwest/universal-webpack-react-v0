/*
 * webpack-prod-config.js
 *
 * This config is a production worthy modification of the base config.
 */

const webpack = require('webpack');
const deepcopy = require('deepcopy');
const baseConfig = require('./webpack-base-config.js');
const prodConfig = deepcopy(baseConfig);

prodConfig.devTool = false;
// TODO: what about css minification?
prodConfig.plugins.push(new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin());

delete prodConfig.output.sourceMapFilename;

module.exports = prodConfig;
