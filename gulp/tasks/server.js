'use strict';

module.exports = () => {
  $.gulp.task('server', () => {
    $.browserSync({
      port: 9000,
      server: {
        baseDir: 'prod'
      }
    });
  });
};
