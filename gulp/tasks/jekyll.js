var	gulp   = require('gulp')
,	gutil  = require('gulp-util')
,	spawn  = require('child_process').spawn

module.exports = function() {
	gutil.log('Building jekyll from ./src/ to ./_site');
	spawn('jekyll', ['build', '--source', './src/']);
}
