'use strict';
module.exports = () => {
  $.gulp.task('assets', () => {
    $.runSequence('assets-clean',
      'assets-copy');
  });
};
