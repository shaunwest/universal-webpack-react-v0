var colors = require('colors');

var EMOJI_ACTIVITY = '⌛ ',
    EMOJI_SUCCESS = '😸 ',
    EMOJI_ERROR = '🙀 ',
    EMOJI_WARN = '😿 ',
    EMOJI_GO = '👉 ',
    EMOJI_LINK = '🔗 ';
 
module.exports = {
    EMOJI_ACTIVITY: EMOJI_ACTIVITY,
    EMOJI_SUCCESS: EMOJI_SUCCESS,
    EMOJI_ERROR: EMOJI_ERROR,
    EMOJI_WARN: EMOJI_WARN,
    EMOJI_GO: EMOJI_GO,
    EMOJI_LINK: EMOJI_LINK,
    activity: function (msg) {
        return EMOJI_ACTIVITY + ' ' + msg + '...';
    },
    success: function (msg) {
        return EMOJI_SUCCESS + ' ' + msg;
    },
    error: function (msg) {
        return colors.red(EMOJI_ERROR + ' ' + msg);
    },
    warn: function (msg) {
        return colors.yellow(EMOJI_WARN + ' ' + msg);
    },
    go: function (msg) {
        return EMOJI_GO + ' ' + msg;
    },
    link: function (msg) {
        return EMOJI_LINK + ' ' + msg;
    }
}
