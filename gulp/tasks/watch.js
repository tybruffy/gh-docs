var	gulp   = require('gulp')

module.exports = function() {
	gulp.watch('./assets/**/*.less', ['less']);
	gulp.watch([
		'./assets/**/*.*', 
		'./_includes/README.md', 
		'./**/*.html', 
		'!./_site/**', 
		'!./assets/**/*.less'
	], ['jekyll']);
}
