/*
 * start.js
 * this is the master script for making and watching builds
 */

const colors = require('colors'),
    util = require('./webpack/util.js'),
    start = require('./webpack');

start.prod(() => {
    console.log(`             ${ colors.bold.bgRed('    PROD MODE    ') }
    `); 

    return {};
});

start.dev(() => {
    console.log(`         ${ colors.bold.bgMagenta(' UNIVERSAL/WEBPACK/REACT ') }
    `); 

    return {
        externalCss: util.arg('linkcss'),
        verbose: util.arg('verbose')
    };
});
