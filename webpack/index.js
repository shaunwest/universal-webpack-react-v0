/*
 * index.js
 *
 * This is the main entry point into the webpack build system
 */

// Enable ES2015
require('babel-polyfill');
require('babel-core/register')({
    presets: ['es2015', 'react', 'stage-0']
});

var builder = require('./builder.js');

module.exports = {
    prod: builder.prod,
    dev: builder.dev
};
