'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), 'throw': verb(1), 'return': verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError('Generator is already executing.');
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.define = exports.parallel = exports.series = void 0;
var fancyLog = require('fancy-log');
var ansiColors = require('ansi-colors');
function _renderTime(time) {
    return Math.round(time) + ' ms';
}
// eslint-disable-next-line no-undef
function _isPromise(p) {
    return typeof p.then === 'function';
}
function _doExecute(task) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Always invoke as if it were a callback task
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (task.length === 1) {
                        // this is a callback task
                        task(function (err) {
                            if (err) {
                                return reject(err);
                            }
                            resolve();
                        });
                        return;
                    }
                    var taskResult = task();
                    if (typeof taskResult === 'undefined') {
                        // this is a sync task
                        resolve();
                        return;
                    }
                    if (_isPromise(taskResult)) {
                        // this is a promise returning task
                        taskResult.then(resolve, reject);
                        return;
                    }
                    // this is a stream returning task
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    taskResult.on('end', function (_) { return resolve(); });
                    taskResult.on('error', function (err) { return reject(err); });
                })];
        });
    });
}
function _execute(task) {
    return __awaiter(this, void 0, void 0, function () {
        var name, startTime, elapsedArr, elapsedNanoseconds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = task.taskName || task.displayName || '<anonymous>';
                    if (!task._tasks) {
                        fancyLog('Starting', ansiColors.cyan(name), '...');
                    }
                    startTime = process.hrtime();
                    return [4 /*yield*/, _doExecute(task)];
                case 1:
                    _a.sent();
                    elapsedArr = process.hrtime(startTime);
                    elapsedNanoseconds = (elapsedArr[0] * 1e9 + elapsedArr[1]);
                    if (!task._tasks) {
                        fancyLog('Finished', ansiColors.cyan(name), 'after', ansiColors.magenta(_renderTime(elapsedNanoseconds / 1e6)));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 序列调用任务
 * @param tasks
 */
function series() {
    var _this = this;
    var tasks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tasks[_i] = arguments[_i];
    }
    var result = function () { return __awaiter(_this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < tasks.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, _execute(tasks[i])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    result._tasks = tasks;
    return result;
}
exports.series = series;
function parallel() {
    var _this = this;
    var tasks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tasks[_i] = arguments[_i];
    }
    var result = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(tasks.map(function (t) { return _execute(t); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    result._tasks = tasks;
    return result;
}
exports.parallel = parallel;
/**
 *  定义task任务
 * @param name
 * @param task
 */
function define(name, task) {
    if (task._tasks) {
        var lastTask = task._tasks[task._tasks.length - 1];
        if (lastTask._tasks || lastTask.taskName) {
            return define(name, series(task, function () { return Promise.resolve(); }));
        }
        lastTask.taskName = name;
        task.displayName = name;
        return task;
    }
    task.taskName = name;
    task.displayName = name;
    return task;
}
exports.define = define;
