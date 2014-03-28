var gulp       = require('gulp')
,	rename     = require("gulp-rename")
,	less       = require("gulp-less")
,	jekyll     = require("gulp-jekyll")
,	gutil      = require("gulp-util")
,	livereload = require("gulp-livereload")
,	connect    = require('gulp-connect')
,	request    = require('request')
,	fs         = require('fs')
,	marked     = require('marked');

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


gulp.task('readme', function() {
	request('https://raw.githubusercontent.com/tybruffy/slide-load/master/README.md', function (error, response, body) {
		if (!error && response.statusCode == 200) {

			var content = marked(body, {renderer: renderer})
			count = content.match(/<h1.*id="(.*)">(.*)<\/h1>/g);
			console.log( count )

			fs.writeFile("./_includes/readme.html", content, function(err) {
				if (err) {
					gutil.log(err)
				}
			})

		}
	})
});



var renderer = new marked.Renderer();
renderer.heading = function (txt, lvl) {
	var escTxt = txt.toLowerCase().replace(/[^\w]+/g, '-');
	return '<h'+ lvl +' class="page-header" id="'+ escTxt +'">'+ txt +'</h'+ lvl +'>';
}
