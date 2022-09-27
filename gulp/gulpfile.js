
const gulp = require('gulp');
// const path = require('path');
const task = require('../lib/task');

const _defaultTask = task.define('defaultTask', task.series(() => { console.log(1234); }));
gulp.task('default', _defaultTask);

require('glob').sync('gulpfile.*.js', {cwd: __dirname}).forEach(f => require((`./${f}`)));