var gulp = require('./gulp')([
	'readme',
	'less',
	'serve',
	'jekyll',
	'watch',
	'install',
]);

gulp.task('develop', ['less', 'jekyll', 'watch', 'serve']);
gulp.task('default', ['develop']);