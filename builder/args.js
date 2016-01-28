
module.exports = function (cmdArgs) {
    return cmdArgs.reduce(function (result, arg) {
        result[arg] = true;
        return result;
    }, {});
};
