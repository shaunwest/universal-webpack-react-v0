/*
 * start.js
 * this is the master script for making and watching builds
 */

var colors = require('colors');
var args = require('./builder/args.js')(process.argv);
var start = require('./builder');

var banner = require('./banner.js');

function startProd() {
    console.log('     PROD MODE     '.bgRed);
    console.log('');

    start.prod();
}

function startDev() {
    var externalCss = args.linkcss,
        loud = args.loud;

    // Show a banner!
    banner();

    start.dev({
        externalCss: externalCss,
        loud: loud
    });
}

if (process.env.NODE_ENV === 'production') {
    startProd();
}
else {
    startDev();
}
