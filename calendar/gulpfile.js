/**
 * Created by Deonisiu on 19.02.2019.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var localhost = 'http://localhost/test/calendar/src';

gulp.task('stream', ['browser-sync'], function () {
    watch('src/sass/**/*.scss', {usePolling:true}, function () {
        gulp.start('sass');
    });
    watch('src/*.html', {usePolling:true}, browserSync.reload);
    watch('src/css/style.css', {usePolling:true}, browserSync.reload);

    // watch('src/*.json', {usePolling:true}, browserSync.reload);
    watch('src/js/*.js', {usePolling:true}, browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src("src/sass/style.scss")
        .pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
        .pipe(gulp.dest("src/css"));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: localhost,
        notify: false
    });
});

gulp.task('build', function () {

});