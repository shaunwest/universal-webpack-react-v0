var format = require('./webpack/format.js');

module.exports = Object.assign({}, format, {
    ACTIVITY: '⌛ ',
    SUCCESS: '😸 ',
    ERROR: '🙀 ',
    WARN: '😿 ',
    GO: '👉 ',
    VERBOSE: '📢 ',
    GENERIC: '😼 ',
    LINK: '🔗 '
});
