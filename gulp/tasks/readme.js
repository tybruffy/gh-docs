var	gulp       = require('gulp')
,	changed    = require('gulp-changed')
,	imagemin   = require('gulp-imagemin')
,	livereload = require('gulp-livereload')

module.exports = function() {
	var dest = './build/images';

	gulp.src('./src/images/**')
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};