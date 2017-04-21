var gulp = require('gulp'),
    connect = require('gulp-connect');

annotate = require('gulp-ng-annotate');
uglify = require('gulp-uglify');
concat = require('gulp-concat');
ngmin = require('gulp-ngmin');
minicss = require('gulp-minify-css');

gulp.task('connect', function () {
    connect.server({
        root: 'www',
        port: 8090,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src([
        './www/*.html',
        './www/template/createdoor/*.html',
        './www/template/clientAuthority/*.html',
        './www/template/employeeAuthority/*.html',
        './www/template/compartment/*.html',
        './www/template/setType/*.html'
    ])
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./www/css/*.css')
        .pipe(connect.reload());
});

gulp.task('script', function () {
    gulp.src([
        './www/*.js',
        './www/js/*.js',
    ])
        .pipe(connect.reload());
});

gulp.task('minijs', function () {
    gulp.src([
        './www/*.js',
        './www/js/*.js'
    ])
        .pipe(annotate())
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(concat('controller.min.js'))
        .pipe(gulp.dest('./www/dest/js/'));
});


gulp.task('minicss', function () {
    gulp.src([
        './www/css/theme.css',
        './www/css/main.css'
    ])
        .pipe(minicss())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./www/dest/css/'));
});


gulp.task('watch', function () {
    gulp.watch([
        './www/*.html',
        './www/template/createdoor/*.html',
        './www/template/clientAuthority/*.html',
        './www/template/employeeAuthority/*.html',
        './www/template/compartment/*.html',
        './www/template/setType/*.html'
    ], ['html']);
    gulp.watch(['./www/css/*.css'], ['css', 'minicss']);
    gulp.watch([
        './www/*.js',
        './www/js/*.js',
    ], ['script', 'minijs']);
});

gulp.task('default', ['connect', 'watch']);