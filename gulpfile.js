var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(cb) {
	gulp.src('./assets/less/docs.less')
		.pipe(less({
			compress: true,
		}))
		.pipe(gulp.dest('./assets/css/'));
	
	cb();
});

gulp.task('jekyll', ['less'], function() {
	var child  = require('child_process').spawn
	,	jekyll = child('jekyll', ['serve']);
});

gulp.task('watch', function() {
	gulp.watch('./assets/less/*.less', ['jekyll']);
});

gulp.task('default', ['watch']);