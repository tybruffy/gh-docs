var gulp = require('./gulp')([
	'readme',
	'less',
	'serve',
	'jekyll',
	'watch',
]);

gulp.task('develop', ['less', 'jekyll', 'watch', 'serve']);
gulp.task('default', ['develop']);