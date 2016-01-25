/*
 * start.js
 * this is the master script for starting and watching builds
 */

var xconsole = require('./xconsole.js');
var banner = require('./banner.js');
var devServer;
var APP_ROOT = '..';

// We're in server mode
global.__SERVER__ = true;

// If in prod mode, just start the babel server
if (process.env.NODE_ENV === 'prod') {
    require('./start-babel-server.js');
}
else {
    // Show a banner!
    banner();

    xconsole.success('Hello! Hit Ctrl+C to exit at any time.');

    // Start the webpack dev server
    devServer = require(APP_ROOT + '/builder/webpack-dev-server');

    if (devServer) {
        devServer(
            function onCompile() {
                xconsole.success('Compile finished.');

                // Spawn a new babel server process
                // Piping will watch for changes and relaunch the server
                require('piping')({
                    main: './builder/start-babel-server.js',
                    hook: true,
                    includeModules: false
                });
              },
            function onWatching() {
                xconsole.success('Watching for changes.');
            }
        );
    }
}
