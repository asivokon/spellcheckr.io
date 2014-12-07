/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp  = require('gulp');
var config= require('../config');

gulp.task('_watch', ['setWatch'], function() {
    gulp.watch(config.sass.src,   ['sass']);
    gulp.watch(config.sass.watch,   ['sass']);
    gulp.watch(config.less.src,   ['less']);
    gulp.watch(config.less.watch,  ['less']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.templates.src, ['templates', 'templates-raw']);
});
