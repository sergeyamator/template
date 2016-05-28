'use strict';

let path = require('./gulp/path/tasks.js');

global.$ = {
  gulp: require('gulp'),
  runSequence: require('run-sequence'),
  browserSync: require('browser-sync'),
  gp: require('gulp-load-plugins')()
};

path.forEach(taskPath => require(taskPath)());

$.gulp.task('default', function() {
  $.runSequence(
    'jade-compile',
    'sass-foundation',
    'sass-compile',
    'webpack',
    'assets',
    'watch',
    'server')
});




