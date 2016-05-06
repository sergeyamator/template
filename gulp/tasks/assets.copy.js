'use strict';

module.exports = () => {
  $.gulp.task('assets-copy', () => {
     $.gulp.src('dev/assets/**/*')
      .pipe($.gulp.dest('prod/assets/'));
  });
};
