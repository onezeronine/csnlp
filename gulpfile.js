var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('unit-test', function() {
  return gulp
    .src('./test/*.js', {read: false})
    .pipe(mocha());
});
