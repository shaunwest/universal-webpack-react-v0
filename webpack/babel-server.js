const util = require('./util.js');
const BABEL_PRESETS = ['es2015', 'react', 'stage-0'];

function babelServer(devMode) {
    console.info('-> Starting server...');

    global.__SERVER__ = true;

    try {
        // Enable full ES2015 support on the server side
        require('babel-polyfill');
        require('babel-core/register')({
            only: /server|client|shared/,
            presets: BABEL_PRESETS
        });
        require('../server/server.js')(devMode, util.arg('linkcss'));
    }
    catch (error) {
        console.error(error.stack);
    }
}

module.exports = babelServer;
