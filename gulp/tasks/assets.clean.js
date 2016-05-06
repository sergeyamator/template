'use strict';

module.exports = () => {
  $.gulp.task('assets-clean', () => {
    return $.gulp.src('prod/assets', {read: false})
      .pipe($.gp.clean());
  });
};