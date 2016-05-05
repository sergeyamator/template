'use strict';

const gulp         = require('gulp'),
      concat       = require('gulp-concat'),
      browserSync  = require('browser-sync'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      jade         = require('gulp-jade'),
      rename       = require("gulp-rename"),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      spritesmith  = require('gulp.spritesmith'),
      plumber      = require('gulp-plumber'),
      runSequence  = require('run-sequence'),
      webpack      = require('gulp-webpack'),
      clean        = require('gulp-clean');


/* --------- paths --------- */
var paths = {
  scss: {
    location: [
      'bower_components/normalize-scss/_normalize.scss',
      'dev/scss/main.scss'
    ],
    destination: 'prod/css'
  },

  js: {
    location: [
      'bower_components/jquery/dist/jquery.js',
      'dev/js/modules/init.js'
    ],
    destination: 'prod/js'
  }
};


/* ----- jade ----- */
gulp.task('jade-compile', function() {
  gulp.src('dev/jade/pages/index.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('prod/'))
});


/* ------ sass ------ */
gulp.task('sass-compile', function() {
  gulp.src(paths.scss.location)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.css"))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    //.pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destination));
});


gulp.task('webpack', function() {
  return gulp.src('dev/js/main.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(paths.js.destination));
});

/* -------- auto sprites  -------- */
gulp.task('sprite', function() {
  var spriteData = gulp.src('dev/img/icons/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../img/sprite.png',
      cssName: 'sprite.scss'
    }));
  spriteData.img.pipe(gulp.dest('dev/img/'));
  spriteData.css.pipe(gulp.dest('dev/scss/'));
});


/* -------- images minification  -------- */
gulp.task('img-min', function() {
  return gulp.src('dev/assets/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('prod/img'));
});

/* -------- Assets clean ------- */
gulp.task('assets-clean', function() {
  return gulp.src('prod/assets', {read: false})
    .pipe(clean());
});
/* ---------- Assets copy ---------- */
gulp.task('assets-copy', function() {
  return gulp.src('dev/assets/**/*')
    .pipe(gulp.dest('prod/assets'));
});

gulp.task('assets', function() {
  runSequence('assets-clean',
    'assets-copy');
});

/* -------- gulp server  -------- */
gulp.task('server', function() {
  browserSync({
    port: 9000,
    server: {
      baseDir: 'prod'
    }
  });
});


/* -------- gulp watching  -------- */
gulp.task('watch', function() {
  gulp.watch('dev/jade/**/*.jade', ['jade-compile']);
  gulp.watch('dev/scss/**/*.scss', ['sass-compile']);
  gulp.watch('dev/img/**/*', ['img-min']);
  gulp.watch('dev/js/**/*.js', ['webpack']);
  gulp.watch('dev/assets/**/*', ['assets']);
  gulp.watch([
    'prod/**/*.html',
    'prod/js/**/*.js',
    'prod/css/**/*.css'
  ]).on('change', browserSync.reload);
});


gulp.task('default', function() {
  runSequence(
    'jade-compile',
    'sass-compile',
    'webpack',
    'assets',
    'server',
    'watch')
});




