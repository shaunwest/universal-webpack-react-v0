var log = require('./log.js');

var BABEL_PRESETS = ['es2015', 'react', 'stage-0'],
    APP_ROOT = '..';

function runServer() {
    log.activity('One moment');

    try {
        require('babel-polyfill');
        require('babel-core/register')({
            only: /src/,
            presets: BABEL_PRESETS
        });
        require(APP_ROOT + '/src/server');
    }
    catch (error) {
        console.error(error.stack);
    }
}

//module.exports = runServer;
runServer();
