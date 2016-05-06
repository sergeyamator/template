"use strict";

module.exports = () => {
  $.gulp.task('sprite', () => {
    var spriteData = $.gulp.src('dev/assets/img/icons/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: 'sprite.scss'
      }));
    spriteData.img.pipe($.gulp.dest('dev/img/'));
    spriteData.css.pipe($.gulp.dest('dev/scss/'));
  });
};