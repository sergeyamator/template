'use strict';

module.exports = () => {
  $.gulp.task('watch', () => {
    $.gulp.watch('dev/jade/**/*.jade', ['jade-compile']);
    $.gulp.watch('dev/scss/**/*.scss', ['sass-compile']);
    $.gulp.watch('dev/img/**/*', ['img-min']);
    $.gulp.watch('dev/js/**/*.js', ['webpack']);
    $.gulp.watch('dev/assets/**/*', ['assets']);
    $.gulp.watch([
      'prod/**/*.html',
      'prod/js/**/*.js',
      'prod/css/**/*.css'
    ]).on('change', $.browserSync.reload);
  });
};