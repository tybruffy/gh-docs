var	gulp   = require('gulp')
,	gutil  = require('gulp-util')
// ,	jekyll = require("gulp-jekyll")
,	spawn  = require('child_process').spawn

module.exports = function() {
	gutil.log('Building jekyll from ./src/ to ./_site');
	spawn('jekyll', ['build', '--source', './src/']);
}
