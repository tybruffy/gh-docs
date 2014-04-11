var	gulp   = require('gulp')

module.exports = function() {
	gulp.watch(['./src/**/*.*', '!./src/assets/**/*.less'], ['jekyll']);
	gulp.watch('./src/assets/**/*.less', ['less']);
}
