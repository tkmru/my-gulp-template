'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const gls = require('gulp-live-server');

// settings
const public_dir = './public';  // for LiveReload
const scss_dir = './scss';      // for scss compile
const settings = {
  scss_files: scss_dir + '/**/*.scss',
  css_outputdir: public_dir + '/css',
  livereload_files: [public_dir + '/**/*.css', public_dir + '/**/*.js', public_dir + '/**/*.html'],
  port: 3000
}

// sass compile task
gulp.task("sass", function () {
    gulp.src(settings.scss_files)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(settings.css_outputdir));
});

// LiveReload task
gulp.task('livereload', function() {
  const server = gls.static(public_dir, settings.port);
  server.start();

  gulp.watch(settings.livereload_files, function (file) {
    server.notify.apply(server, [file]);
  });
});

// sass compile task & LiveReload task
gulp.task('watch', ['sass'], function() {
  var server = gls.static(public_dir, settings.port);
  server.start();
  gulp.watch(settings.scss_files, ['sass']);
  gulp.watch(settings.livereload_files, function (file) {
    server.notify.apply(server, [file]);
  });
});
