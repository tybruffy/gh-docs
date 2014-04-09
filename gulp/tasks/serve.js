var	gulp    = require('gulp')
,	connect = require('gulp-connect')

module.exports = function() {
	connect.server({
		root: ['./_site'],
		port: 4000,
	})
}