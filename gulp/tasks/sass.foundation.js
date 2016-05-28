"use strict";
let paths = require('../path/sass.foundation');

module.exports = () => {
  $.gulp.task('sass-foundation', () => {
    $.gulp.src(paths)
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.concat("foundation.min.css"))
      .pipe($.gp.sass.sync().on('error', $.gp.sass.logError))
      .pipe($.gp.sass({outputStyle: 'compressed'}))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest('prod/css'));
  });
};