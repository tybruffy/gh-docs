var gulp = require('gulp');
var fs   = require('fs');

gulp.task('less', function() {
	var child  = require('child_process').spawn
	,	less = child('lessc', ['--yui-compress', './assets/less/docs.less', './assets/css/docs.min.css']);
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

gulp.task('default', ['watch']);