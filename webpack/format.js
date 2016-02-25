var colors = require('colors');

module.exports = {
    ACTIVITY: '-->',
    SUCCESS: '-->',
    ERROR: '-->',
    WARN: '-->',
    GO: '-->',
    VERBOSE: '-->',
    GENERIC: '-->',
    LINK: '-->',
    activity: function (msg) {
        return this.ACTIVITY + ' ' + msg + '...';
    },
    success: function (msg) {
        return this.SUCCESS + ' ' + msg;
    },
    error: function (msg) {
        return colors.red(this.ERROR + ' ' + msg);
    },
    warn: function (msg) {
        return colors.yellow(this.WARN + ' ' + msg);
    },
    go: function (msg) {
        return this.GO + ' ' + msg;
    },
    link: function (msg) {
        return this.LINK + ' ' + msg;
    },
    verbose: function (msg) {
        return this.VERBOSE + ' ' + msg;
    },
    generic: function (msg) {
        return this.GENERIC + ' ' + msg;
    }
};
