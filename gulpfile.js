'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    minifyCss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter');

/* ----- jade ----- */
gulp.task('jade', function () {
    gulp.src(['dev/jade/[^_]*.jade'])
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dev/'))
});

/* ------ sass ------ */
gulp.task('sass', function () {
    gulp.src('dev/scss/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css'));
});

/* -------- autoprefixer -------- */
gulp.task('autpr', function () {
    return gulp.src('prod/css/main.min.css')
        .pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
        .pipe(gulp.dest('prod/css'));
});


/* -------- minification CSS -------- */
gulp.task('minify-css', function () {
    return gulp.src('dev/css/main.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('prod/css'));
});


/* -------- concat JS -------- */
gulp.task('concat', function () {
    return gulp.src('dev/js/modules/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dev/js'));
});


/* -------- minification JS -------- */
gulp.task('compress', function () {
    return gulp.src('dev/js/app.js')
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('prod/js'));
});


/* -------- auto sprites  -------- */
gulp.task('sprite', function () {
    var spriteData = gulp.src('dev/img/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('dev/img/'));
    spriteData.css.pipe(gulp.dest('dev/scss/'));
});


/* -------- images minification  -------- */
gulp.task('imagemin', function () {
    return gulp.src('dev/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('prod/img'));
});


/* --------------------- bower JS--------------------- */
gulp.task('bower-CSS', function() {
    var filterCSS = gulpFilter('**/*.css', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterCSS)
        .pipe(rename("vendor.css"))
        .pipe(gulp.dest('dev/css/libs'));
});

/* --------------------- bower CSS--------------------- */
gulp.task('bower-JS', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterJS)
        .pipe(rename("vendor.js"))
        .pipe(gulp.dest('dev/js/libs'));
});




/* -------- gulp server  -------- */
gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'dev'
        }
    });
});


/* -------- gulp watching  -------- */
gulp.task('watch', function () {
    gulp.watch('dev/jade/*.jade', ['jade']);
    gulp.watch('dev/scss/*.scss', ['sass']);
    gulp.watch('dev/css/*.css', ['minify-css']);
    gulp.watch('prod/css/*.css', ['autpr']);
    gulp.watch('dev/js/modules/*.js', ['concat']);
    gulp.watch('dev/js/app.js', ['compress']);
    gulp.watch('dev/img/**/*', ['imagemin']);
    gulp.watch([
        'dev/index.html',
        'dev/js/**/*.js',
        'dev/css/**/*.css'
    ]).on('change', browserSync.reload);
});


gulp.task('default', [
    'watch',
    'jade',
    'sass',
    'concat',
    'compress',
    'server'
]);




