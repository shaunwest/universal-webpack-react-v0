var webpack = require('webpack');
var baseConfig = require('./webpack-base-config.js');
var prodConfig = Object.assign({}, baseConfig);

prodConfig.devTool = false;
// TODO: what about css minification?
prodConfig.plugins.push(new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin());

delete prodConfig.output.sourceMapFilename;

module.exports = prodConfig;
