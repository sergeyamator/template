"use strict";

module.exports = () => {
  $.gulp.task('sass-compile', () => {
    $.gulp.src('dev/scss/main.scss')
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.concat("main.min.css"))
      .pipe($.gp.sass.sync().on('error', $.gp.sass.logError))
      .pipe($.gp.sass({outputStyle: 'compressed'}))
      //.pipe(autoprefixer())
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest('prod/css'));
  });
};