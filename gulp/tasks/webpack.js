"use strict";

module.exports = () => {
  $.gulp.task('webpack', () => {
    return $.gulp.src('dev/js/main.js')
      .pipe($.gp.webpack( require('../../webpack.config.js') ))
      .pipe($.gulp.dest('prod/js'));
  });
};