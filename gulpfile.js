var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var csso = require("gulp-csso");
var gutil = require("gulp-util");
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var include = require('gulp-include');

var docsJs = './docs/js';
var docsCss = './docs/css';

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

    // Bootstrap native
    gulp.src([
        './node_modules/bootstrap.native/dist/bootstrap-native-v4.min.js',
        './node_modules/bootstrap.native/dist/bootstrap-native-v4.min.js'
    ])
        .pipe(gulp.dest(docsJs));

});


// Compile CSS
gulp.task('css:compile', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest(docsCss));
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
    return gulp.src([
        './docs/css/*.css',
        '!./docs/css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(docsCss))
        .pipe(browserSync.stream());

});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

//Compile JavaScript
gulp.task('js:compile', function () {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest(docsJs));
});

// Minify JavaScript
gulp.task('js:minify', function () {
    return gulp.src([
        './docs/js/*.js',
        '!./docs/js/*.min.js'
    ])
        .pipe(include())
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(docsJs))
        .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// HTML
gulp.task('html', function () {
    gulp.src(['./src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./docs'))
        .pipe(browserSync.stream());
});

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    });
});

// Prod task
gulp.task('prod', ['vendor', 'css', 'js', 'html']);

// Dev task
gulp.task('dev', ['prod', 'browserSync'], function () {
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/html/**/*.html', ['html']);
});


// node node_modules/gulp/bin/gulp.js dev
