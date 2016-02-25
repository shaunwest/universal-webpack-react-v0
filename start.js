/*
 * start.js
 * this is the master script for making and watching builds
 */

var colors = require('colors');
var args = require('./webpack/args.js')(process.argv);
var start = require('./webpack');
var banner = require('./banner.js');

start.prod(function () {
    console.log('     PROD MODE     '.bgRed);
    console.log('');

    return {};
});

start.dev(function () {
    var externalCss = args.linkcss,
        loud = args.loud;

    // Show a banner!
    banner();

    return {
        externalCss: externalCss,
        loud: loud
    };
});
