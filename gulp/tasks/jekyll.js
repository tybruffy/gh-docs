var	gulp   = require('gulp')
,	gutil  = require('gulp-util')
,	jekyll = require("gulp-jekyll")

module.exports = function() {
	gutil.log('building jekyll');
	var child  = require('child_process').spawn
	,	jekyll = child('jekyll', ['build']);
}
