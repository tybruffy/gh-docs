var gulp       = require('gulp')
,	rename     = require("gulp-rename")
,	less       = require("gulp-less")
,	jekyll     = require("gulp-jekyll")
,	gutil      = require("gulp-util")
,	livereload = require("gulp-livereload")
,	connect    = require('gulp-connect')

gulp.task('less', function() {
	gutil.log('compiling less');
	var child = require('child_process').spawn
	,	less  = child('lessc', ['--yui-compress', './assets/less/docs.less', './assets/css/docs.min.css']);
});

gulp.task('jekyll', ['less'], function() {
	gutil.log('building jekyll');
	var child  = require('child_process').spawn
	,	jekyll = child('jekyll', ['build']);
});

gulp.task('serve', connect.server({
	root: ['_site'],
	port: 4000,
}));

gulp.task('watch', function() {
	gulp.watch('./assets/**/*.less', ['less']);
	gulp.watch(['./assets/**/*.*', './_includes/README.md', './**/*.html', '!./_site/**', '!./assets/**/*.less'], ['jekyll']);
});

gulp.task('develop', ['less', 'jekyll', 'watch', 'serve']);

gulp.task('default', ['develop']);

// gulp.task('less', function() {
// 	gulp.src('./assets/less/docs.less')
// 		.pipe(less({
// 			yui-compress: true,
// 		}))
// 		.pipe(rename(function (path) {
// 			path.basename += ".min";
// 			path.extname = ".css"
// 		}))
// 		.pipe(gulp.dest('./assets/css'))
// });