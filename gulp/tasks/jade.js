"use strict";

module.exports = () => {
  $.gulp.task('jade-compile', () => {
    $.gulp.src('dev/jade/pages/index.jade')
      .pipe($.gp.plumber())
      .pipe($.gp.jade({
        pretty: true
      }))
      .pipe($.gulp.dest('prod/'))
  });
};