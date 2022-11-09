'use strict';
exports.__esModule = true;
exports.setExecutableBit = exports.rimraf = void 0;
var path = require('path');
var _rimraf = require('rimraf');
var es = require('event-stream');
var _filter = require('gulp-filter');
function rimraf(dir) {
    var result = function () { return new Promise(function (c, e) {
        var retries = 0;
        var retry = function () {
            _rimraf(dir, { maxBusyTries: 1 }, function (err) {
                if (!err) {
                    return c();
                }
                if (err.code === 'ENOTEMPTY' && ++retries < 5) {
                    return setTimeout(function () { return retry(); }, 10);
                }
                return e(err);
            });
        };
        retry();
    }); };
    result.taskName = 'clean-' + path.basename(dir).toLowerCase();
    return result;
}
exports.rimraf = rimraf;
// eslint-disable-next-line no-undef
function setExecutableBit(pattern) {
    var setBit = es.mapSync(function (f) {
        if (!f.stat) {
            f.stat = { isFile: function () { return true; } };
        }
        f.stat.mode = /* 100755 */ 33261;
        return f;
    });
    if (!pattern) {
        return setBit;
    }
    var input = es.through();
    var filter = _filter(pattern, { restore: true });
    var output = input
        .pipe(filter)
        .pipe(setBit)
        .pipe(filter.restore);
    return es.duplex(input, output);
}
exports.setExecutableBit = setExecutableBit;
