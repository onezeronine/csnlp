var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('analysis', function() {
  return gulp
    .src([
      './modules/**/*.js',
      './csnlp.js'
    ])
    .pipe(jshint())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('spectest', ['analysis'], function() {
  return gulp
    .src('./test/*.js', {read: false})
    .pipe(mocha());
});
