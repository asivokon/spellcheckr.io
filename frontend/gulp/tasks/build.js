var gulp = require('gulp');

gulp.task('build', ['browserify', 'sass', 'less', 'images', 'templates', 'templates-raw']);
