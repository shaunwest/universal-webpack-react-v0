var path = require('path');

var watchServerHostname = process.env.WEBPACK_HOSTNAME || 'localhost',
    watchServerPort = process.env.WEBPACK_PORT || 1335,
    watchServerUrl = 'http://' + watchServerHostname + ':' + watchServerPort,
    appRoot = path.join(__dirname,  '/../');

module.exports = {
    watchServerHostname: watchServerHostname,
    watchServerPort: watchServerPort,
    watchServerUrl: watchServerUrl,
    appRoot: appRoot
};
