var	gulp   = require('gulp')
,	less   = require('gulp-less')
,	rename = require('gulp-rename')

module.exports = function() {
	gulp.src('./assets/less/docs.less')
		.pipe( less({ compress: true }) )
		.pipe( rename({ suffix: ".min", extname: ".css" }) )
		.pipe( gulp.dest('./assets/css') );
}