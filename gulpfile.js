var gulp = require('gulp');
var less = require('gulp-less');
var fs   = require('fs');

gulp.task('less', function(cb) {
	console.log( "compiling less files" )
	gulp.src('./assets/less/docs.less')
		.pipe(less({
			compress: true,
		}))
		.pipe(gulp.dest('./assets/css/'));
	
	cb();
});

gulp.task('alt-less', function() {
	var child  = require('child_process').spawn
	,	less = child('lessc', ['--yui-compress', './assets/less/docs.less', './assets/css/test.css']);
})

gulp.task('jekyll', ['less'], function() {
	console.log( "starting jekyll" )
	var child  = require('child_process').spawn
	,	jekyll = child('jekyll', ['serve']);
});

gulp.task('watch', function() {
	console.log( "watching less files." )
	gulp.watch('./assets/less/*.less', ['jekyll']);
});

gulp.task('default', ['alt-less']);