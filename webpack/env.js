/*
 * env.js
 *
 * Some useful environment variables (and defaults)
 */

const path = require('path');

const hostname = process.env.HOSTNAME || 'localhost',
    port = process.env.PORT || 1336,
    watchServerHostname = process.env.WEBPACK_HOSTNAME || 'localhost',
    watchServerPort = process.env.WEBPACK_PORT || 1335,
    watchServerUrl = 'http://' + watchServerHostname + ':' + watchServerPort,
    appRoot = path.join(__dirname,  '/../');

module.exports = {
    hostname: hostname,
    port: port,
    watchServerHostname: watchServerHostname,
    watchServerPort: watchServerPort,
    watchServerUrl: watchServerUrl,
    appRoot: appRoot
};
