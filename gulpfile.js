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
    plumber = require('gulp-plumber');


/* --------- paths --------- */
var paths = {
    scss: {
        location: ['dev/scss/*.scss'],
        destination: 'dev/css'
    },

    js: {
        location: ['dev/js/modules/*.js'],
        destination: 'dev/js'
    },

    bowerCss: {
        location: [
            'bower_components/normalize-css/normalize.css'
        ],
        destination: 'dev/css'
    },

    bowerJS: {
        location: [
            'bower_components/jquery/dist/jquery.js'
        ],
        destination: 'dev/js'
    }
};


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
    gulp.src(paths.scss.location)
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scss.destination));
});


/* -------- minification CSS -------- */
gulp.task('minify-css', function () {
    return gulp.src('dev/css/main.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('prod/css'));
});


/* -------- autoprefixer -------- */
gulp.task('autpr', function () {
    return gulp.src('prod/css/main.min.css')
        .pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
        .pipe(gulp.dest('prod/css'));
});



/* -------- concat CSS -------- */
gulp.task('concat-bower-css', function () {
    return gulp.src(paths.bowerCss.location)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.bowerCss.destination));
});


/* -------- minification Vendor CSS -------- */
gulp.task('minify-vendor', function () {
    return gulp.src('dev/css/vendor.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("vendor.min.css"))
        .pipe(gulp.dest('prod/css'));
});



/* -------- concat JS -------- */
gulp.task('concat-JS', function () {
    return gulp.src(paths.js.location)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.js.destination));
});

/* -------- concat Vendor JS -------- */
gulp.task('concat-bower-js', function () {
    return gulp.src(paths.bowerJS.location)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.bowerJS.destination));
});


/* -------- minification JS -------- */
gulp.task('compress', function () {
    return gulp.src('dev/js/app.js')
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('prod/js'));
});


/* -------- minification Bower JS -------- */
gulp.task('compress-vendor-js', function () {
    return gulp.src('dev/js/vendor.js')
        .pipe(uglify())
        .pipe(rename("vendor.min.js"))
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
    gulp.watch('dev/js/modules/*.js', ['concat-JS']);
    gulp.watch([
        'dev/index.html',
        'dev/js/**/*.js',
        'dev/css/**/*.css'
    ]).on('change', browserSync.reload);
});


gulp.task('default', [
    'jade',
    'sass',
    'concat-JS',
    'concat-bower-css',
    'concat-bower-js',
    'compress',
    'watch',
    'server'
]);


gulp.task('prod', [
    'minify-css',
    'autpr',
    'minify-vendor',
    'compress',
    'compress-vendor-js',
    'imagemin'
]);




