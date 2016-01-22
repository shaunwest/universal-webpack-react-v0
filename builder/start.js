var log = require('./log.js');
var banner = require('./banner.js');
//var runServer = require('./babel.js');

var APP_ROOT = '..';
var isChildProcess;

global.__SERVER__ = true;

if (process.env.NODE_ENV === 'prod') {
    //runServer();
} else {
    isChildProcess = require('piping')({
        main: './builder/babel.js',
        hook: true,
        includeModules: false
    });

    if (isChildProcess) {
        //runServer();
        log.out('helllooo!');
    } else {
        banner();
        require(APP_ROOT + '/builder/webpack-dev-server');
        log.out('🐠  Spawning a dev server... 🐠 ');
    }
}
