var gulp = require('./gulp')([
	'readme',
]);

gulp.task('test', ['readme']);



// var gulp        = require('gulp')
// ,	gutil       = require("gulp-util")
// ,	rename      = require("gulp-rename")
// ,	connect     = require('gulp-connect')
// ,	download    = require("gulp-download")
// ,	frontMatter = require('gulp-front-matter')
// ,	es          = require('event-stream')
// ,	fs          = require('fs')
// ,	less        = require("gulp-less")
// ,	jekyll      = require("gulp-jekyll")
// ,	marked      = require('marked')
// // ,	gmarked     = require('gulp-marked')
// ,	yaml        = require('js-yaml')

// gulp.task('less', function() {
// 	gulp.src('./assets/less/docs.less')
// 		.pipe( less({ compress: true }) )
// 		.pipe( rename({ suffix: ".min", extname: ".css" }) )
// 		.pipe( gulp.dest('./assets/css') );
// });

// gulp.task('jekyll', ['less'], function() {
// 	gutil.log('building jekyll');
// 	var child  = require('child_process').spawn
// 	,	jekyll = child('jekyll', ['build']);
// });

// gulp.task('serve', connect.server({
// 	root: ['_site'],
// 	port: 4000,
// }));

// gulp.task('watch', function() {
// 	gulp.watch('./assets/**/*.less', ['less']);
// 	gulp.watch(['./assets/**/*.*', './_includes/README.md', './**/*.html', '!./_site/**', '!./assets/**/*.less'], ['jekyll']);
// });

// gulp.task('develop', ['less', 'jekyll', 'watch', 'serve']);

// gulp.task('default', ['develop']);


// gulp.task('readme', function() {
// 	var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

// 	download(config.project.readme)
// 		.pipe(es.map( convertMD ))
// 		.pipe(rename("readme.html"))
// 		.pipe(gulp.dest("./_includes"))
// 		.pipe(parseReadme())
// 	.pipe(fileSwitch("./index.html"))
// 		.pipe(rename("index.bak.html"))
// 		.pipe(gulp.dest("./"))		
// 	.pipe(frontMatter({
// 			remove: true
// 		}))
// 		.pipe(addData("sections"))
// 		.pipe(addFrontMatter())
// 		.pipe(rename("index.html"))
// 		.pipe(gulp.dest("./"))
// });



