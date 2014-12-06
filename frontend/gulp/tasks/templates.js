var gulp = require('gulp');
var jade = require('gulp-jade');
var config = require('../config').templates

gulp.task('templates', function() {
  return gulp.src(config.src)
      .pipe(jade({
          pretty: true,
          data: require('../../package.json')
      }))
    .pipe(gulp.dest(config.dest));
});


gulp.task('templates-raw', function() {
    return gulp.src(config.src_raw)
        .pipe(gulp.dest(config.dest));
});
