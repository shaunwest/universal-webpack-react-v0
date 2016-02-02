var webpack = require('webpack');
var path = require('path');
var format = require('./format.js');

var config = require('./webpack-dev-config.js');

function runWebpackCompile(cb) {
    console.log(format.activity('Compiling'));
    webpack(config)
        .run(function(err, stats) {
            if (cb) {
                cb(err, stats);
            }
            else {
                console.log('Webpack compile complete');
            }
        });
}

function start(onCompiled) {
    try {
        runWebpackCompile(onCompiled);
    }
    catch(error) {
        console.log(format.error('Looks like something\'s wrong with your webpack configuration: ' + error.stack));
    }
}

module.exports = start;
